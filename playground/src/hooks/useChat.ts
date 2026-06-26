'use client';
import * as React from 'react';
import { ChatContext, type ChatContextValue } from './ChatProvider';

export function useChat(): ChatContextValue {
  const ctx = React.useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside <ChatProvider>.');
  return ctx;
}
