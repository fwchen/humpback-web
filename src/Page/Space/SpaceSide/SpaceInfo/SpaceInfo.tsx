import React from 'react';
import { Flex } from '../../../../Component/Flex';
import { Bold } from '../../../../Component/Bold';
import { ISpace } from '../../../../typing/space';

export function SpaceInfo(props: { space: ISpace }) {
  return (
    <Flex
      alignCenter
      style={{
        padding: '12px 13px',
      }}
    >
      <img
        width="60"
        style={{
          boxShadow: '0 0 9px #eee',
          borderRadius: 8,
        }}
        src="/humpback_logo.png"
        alt="logo"
      />
      <Bold
        style={{
          marginLeft: 12,
        }}
      >
        {props.space.name}
      </Bold>
    </Flex>
  );
}
