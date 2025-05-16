// Electronの型定義を拡張
interface Window {
  process?: {
    versions?: {
      electron?: string;
      node?: string;
      chrome?: string;
    };
  };
}
