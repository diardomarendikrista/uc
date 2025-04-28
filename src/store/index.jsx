import { atom } from "jotai";

export const calendarViewAtom = atom("month");
export const calendarDateAtom = atom(new Date());
export const showModalDetailAtom = atom(false);
export const modalDetailDataAtom = atom(false);
