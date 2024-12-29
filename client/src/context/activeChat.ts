import { create } from "zustand";

interface ActiveChatState {
  activeChatId: number | null;
  setActiveChatId: (id: number | null) => void;
}

const useActiveChat = create<ActiveChatState>((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
}));

export default useActiveChat;
