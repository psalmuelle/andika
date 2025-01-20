import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileType } from "types";
import { formatDistance } from "date-fns";
import useActiveChat from "@/context/activeChat";

interface ChatListItemProps {
  messages: MessageType[];
  user: ProfileType;
  admin: ProfileType;
}

interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export function ChatListItem({ messages, user, admin }: ChatListItemProps) {
  const timeAgo = (date: string) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };
  const { activeChatId, setActiveChatId } = useActiveChat();

  return (
    <div
      onClick={() => setActiveChatId(user?.userId)}
      className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-zinc-100 ${activeChatId === user?.userId ? "bg-zinc-100" : ""}`}
    >
      <Avatar>
        <AvatarImage src={user?.avatar} alt={user?.name} />
        <AvatarFallback>
          {user?.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      {messages && messages.length > 0 ? (
        <>
          <div className="min-w-0 flex-1 text-sm">
            <div className="flex items-center justify-between">
              <h3 className="truncate font-semibold">{user?.name}</h3>
              <span className="text-xs text-slate-500">
                {timeAgo(messages[messages.length - 1]?.createdAt)}
              </span>
            </div>
            <p className="max-w-52 truncate text-sm text-slate-500">
              {messages[messages.length - 1]?.content.includes("https://andika")
                ? "📎 Attachment"
                : messages[messages.length - 1]?.content}
            </p>
          </div>

          {messages.filter(
            (m) => m.isRead === false && m.receiverId === admin?.userId,
          ).length > 0 && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {
                messages.filter(
                  (m) => m.isRead === false && m.receiverId === admin?.userId,
                ).length
              }
            </div>
          )}
        </>
      ) : (
        <div className="min-w-0 flex-1 text-sm">
          <div className="flex items-center justify-between">
            <h3 className="truncate font-semibold">{user?.name}</h3>
          </div>

          <p className="max-w-52 truncate text-sm text-blue-500">
            No messages yet!
          </p>
        </div>
      )}
    </div>
  );
}

export function ChatList({
  admin,
  usersMessages,
}: {
  admin: ProfileType | undefined;
  usersMessages: { user: ProfileType; messages: MessageType[] }[] | undefined;
}) {
  return (
    <ScrollArea className="h-[70vh]">
      <div className="flex flex-col">
        {usersMessages &&
          usersMessages?.map(({ user, messages }, index) => (
            <ChatListItem
              admin={admin!}
              key={index}
              messages={messages}
              user={user}
            />
          ))}
      </div>
    </ScrollArea>
  );
}
