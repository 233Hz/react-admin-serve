import { nanoid } from 'nanoid';

export const uuid = () => nanoid();

export const generateRandomCode = () => Math.floor(Math.random() * 9000) + 1000;
