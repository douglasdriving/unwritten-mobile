import {createRef} from 'react';

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigateToRoom(roomId) {
  navigate('Game', { roomId: roomId });
}