export interface Player {
  guid: number;
  name: string;
  race: number;
  class: number;
  gender: number;
  level: number;
}

export interface InventoryItem {
  item_guid: number;
  bag: number;
  slot: number;
  item_instance_guid: number;
  item_id: number;
  name: string;
  displayid: number;
  icon: string;
  itemEntry: number;
}

export interface InventoryResponse {
  inventory: InventoryItem[];
  money: number;
}