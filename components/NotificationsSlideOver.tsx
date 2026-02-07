"use client";

import React from "react";
import { XIcon } from "@/components/Icons";

export type NotificationItem = {
  id: string;
  type: "invite" | "registration" | "match_start" | "info";
  title: string;
  body?: string;
  source?: string;
  timeAgo: string;
  unread: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onSeeMatch?: () => void;
};

type NotificationsSlideOverProps = {
  open: boolean;
  onClose: () => void;
  items: NotificationItem[];
  unreadCount: number;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
};

export default function NotificationsSlideOver({
  open,
  onClose,
  items,
  unreadCount,
  onMarkAllRead,
  onClearAll,
}: NotificationsSlideOverProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-[var(--color-surface)] shadow-xl flex flex-col"
        role="dialog"
        aria-label="Notifications"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] min-h-[44px] min-w-[44px]"
            aria-label="Close"
          >
            <XIcon size={18} />
          </button>
        </div>
        <div className="flex gap-2 px-4 py-2 border-b border-[var(--color-border)] text-sm">
          {unreadCount > 0 && (
            <span className="text-[var(--color-muted)]">{unreadCount} unread</span>
          )}
          {onMarkAllRead && (
            <button type="button" onClick={onMarkAllRead} className="text-primary">
              Mark all as read
            </button>
          )}
          {onClearAll && (
            <button type="button" onClick={onClearAll} className="text-[var(--color-muted)]">
              Clear all
            </button>
          )}
        </div>
        <ul className="flex-1 overflow-auto p-4 space-y-2">
          {items.length === 0 ? (
            <li className="text-sm text-[var(--color-muted)] py-4">No notifications</li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className={`p-3 rounded-[var(--radius-card)] border border-[var(--color-border)] ${
                  item.unread ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex gap-2">
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" aria-hidden />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.title}</p>
                    {item.body && <p className="text-sm text-[var(--color-muted)]">{item.body}</p>}
                    {item.source && (
                      <p className="text-xs text-[var(--color-muted)] mt-1">{item.source} · {item.timeAgo}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {item.onAccept && (
                        <button
                          type="button"
                          onClick={item.onAccept}
                          className="text-sm px-2 py-1 rounded bg-[var(--color-success)] text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          Accept
                        </button>
                      )}
                      {item.onReject && (
                        <button
                          type="button"
                          onClick={item.onReject}
                          className="text-sm px-2 py-1 rounded bg-[var(--color-error)] text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          Reject
                        </button>
                      )}
                      {item.onSeeMatch && (
                        <button
                          type="button"
                          onClick={item.onSeeMatch}
                          className="text-sm text-primary"
                        >
                          See Match
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  );
}
