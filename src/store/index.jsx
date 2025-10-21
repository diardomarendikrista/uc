import { atom } from "jotai";

export const layoutTitleAtom = atom("UC App");
export const layoutBackToAtom = atom(null);

export const calendarViewAtom = atom("month");
export const calendarDateAtom = atom(new Date());
export const showModalDetailAtom = atom(false);
export const modalDetailDataAtom = atom(false);

export const dataLiburAtom = atom([]);
