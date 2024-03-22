export const isPage = (event: Event, className: string) =>
  (event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.contains(className) : false;

export const checkChanges = () => {
  if (window.observerState.cur.currentPage !== window.observerState.old.currentPage) {
    window.observerState.old = JSON.parse(JSON.stringify(window.observerState.cur));
    return true;
  }
  return false;
};

export const submitChanges = () => {
  if (checkChanges()) window.observerSubs.forEach((os) => os(window.observerState.cur));
};

export const updateState = (event: Event) => {
  if ((event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.length === 0 : true)
    return;
  let state = window.observerState.cur;
  if (isPage(event, 'menu')) state.currentPage = 'menu';
  if (isPage(event, 'server-browser-box')) state.currentPage = 'server-list';
  if (isPage(event, 'leaderboard-title-break')) state.currentPage = 'game';
  if (isPage(event, 'hero-select')) state.currentPage = 'hero-select';
  if (isPage(event, 'results')) state.currentPage = 'game-end';
  window.observerState.cur = state;
  submitChanges();
};
