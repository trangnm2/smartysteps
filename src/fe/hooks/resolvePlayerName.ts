// KHONG SUA KHI DOI GAME
export const resolvePlayerName = (username?: string, defaultName: string = "User"): string => {
  if (typeof username === 'string' && username.trim()) return username.trim();

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const paramName = urlParams.get('name');
    if (paramName && paramName.trim()) return paramName.trim();
  }

  return defaultName;
};
