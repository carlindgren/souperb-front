import React from 'react';

export default function Change(onClick, title) {
  return <div onClick={onClick}>{title}</div>;
}
