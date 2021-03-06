import React from 'react';
import { Modal } from '../../../../Component/Modal/Modal';
import { List, ListItem } from '../../../../Component/List/List';
import { Button } from '../../../../Component/Button/Button';
import { ImageUploader } from '../../../../Component/Upload/ImageUploader';
import { useDispatch } from 'react-redux';
import { UploadPageImageRequest } from '../../../../redux/action/page-block-action';

export function AddBlockMenu({
  isOpen,
  closeModal,
  afterOpenModal,
  position,
  pageId,
  spaceId,
  belongBlockId,
  createBlock
}) {
  const dispatch = useDispatch();

  const onImageUpload = result => {
    dispatch(
      UploadPageImageRequest({
        previousBlockId: belongBlockId,
        spaceId: spaceId,
        pageId: pageId,
        data: result
      })
    );
  };

  const onCreateBlock = () => {
    createBlock('', belongBlockId, true);
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'transparent'
        },
        content: {
          top: position.top,
          left: position.left,
          bottom: 'unset',
          right: 'unset',
          transform: 'unset'
        }
      }}
      contentLabel="Example Modal"
    >
      <List>
        <ListItem>
          <Button onClick={onCreateBlock}>文字</Button>
        </ListItem>
        <ListItem>
          <ImageUploader onUpload={onImageUpload}>
            <Button>图片</Button>
          </ImageUploader>
        </ListItem>
      </List>
    </Modal>
  );
}
