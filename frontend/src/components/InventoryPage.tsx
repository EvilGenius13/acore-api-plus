import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { InventoryItem, InventoryResponse } from '../types/types';
import styles from '../styles/InventoryPage.module.css'; // Import the CSS module

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3005/api';

const InventoryPage: React.FC = () => {
  const { guid } = useParams<{ guid: string }>();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [money, setMoney] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMessage('No token found. Please log in.');
          return;
        }

        const response = await axios.get<InventoryResponse>(`${API_URL}/inventory/${guid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInventory(response.data.inventory);
        setMoney(response.data.money);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      }
    };

    if (guid) {
      fetchInventory();
    }
  }, [guid]);

  // Function to calculate gold, silver, and copper
  const calculateMoney = (money: number) => {
    const gold = Math.floor(money / 10000);
    const silver = Math.floor((money % 10000) / 100);
    const copper = money % 100;
    return { gold, silver, copper };
  };

  const { gold, silver, copper } = calculateMoney(money);

  // Create a map for quick slot lookup
  const slotMap: { [key: number]: InventoryItem } = {};
  inventory.forEach((item) => {
    slotMap[item.slot] = item;
  });

  // Total number of slots
  const totalSlots = 40;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Character Inventory</h1>
      <div className={styles.backpack}>
        {Array.from({ length: totalSlots }, (_, index) => (
          <div key={index} className={styles.slot}>
            {slotMap[index] ? (
              <img
                src={slotMap[index].icon}
                alt={slotMap[index].name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/items/Ui-paperdoll-slot-bag.webp'; // Fallback icon
                }}
              />
            ) : (
              <img src="/assets/items/Ui-paperdoll-slot-bag.webp" alt="Empty Slot" />
            )}
          </div>
        ))}
        <div className={styles.moneyContainer}>
          <div className={styles.money}>
            <img src="/assets/currencies/gold.webp" alt="Gold" />
            <span>{gold}</span>
          </div>
          <div className={styles.money}>
            <img src="/assets/currencies/silver.webp" alt="Silver" />
            <span>{silver}</span>
          </div>
          <div className={styles.money}>
            <img src="/assets/currencies/copper.webp" alt="Copper" />
            <span>{copper}</span>
          </div>
        </div>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

// Helper function to convert slot numbers to names (optional for tooltips or accessibility)
const getSlotName = (slot: number): string => {
  const slotNames: { [key: number]: string } = {
    0: 'Head',
    1: 'Neck',
    2: 'Shoulders',
    3: 'Body',
    4: 'Chest',
    5: 'Waist',
    6: 'Legs',
    7: 'Feet',
    8: 'Wrists',
    9: 'Hands',
    10: 'Finger 1',
    11: 'Finger 2',
    12: 'Trinket 1',
    13: 'Trinket 2',
    14: 'Back',
    15: 'Main Hand',
    16: 'Off Hand',
    17: 'Ranged',
    18: 'Tabard',
    19: 'Equipped Bag 1',
    20: 'Chest (Robe)',
    21: 'Main Hand',
    22: 'Off Hand Weapons',
    23: 'Held in Off-Hand',
    24: 'Ammo',
    25: 'Thrown',
    26: 'Ranged Right',
    35: 'Miscellaneous Slot 35',
    36: 'Miscellaneous Slot 36',
    37: 'Miscellaneous Slot 37',
    60: 'Miscellaneous Slot 60',
    // Add other slot mappings as needed
  };

  return slotNames.hasOwnProperty(slot) ? slotNames[slot] : `Unknown Slot (${slot})`;
};

export default InventoryPage;
