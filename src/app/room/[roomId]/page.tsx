"use client";
export default function Chat({ params }: { params: { roomId: string } }) {
  return <div>{params.roomId}</div>;
}
