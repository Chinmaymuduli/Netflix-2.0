import React from 'react';
import {Actionsheet, Box, Text} from 'native-base';

type Action_Type = {
  isOpen?: boolean;
  onClose: () => void;
  Id: string;
};

const CustomActionSheet = ({isOpen, onClose, Id}: Action_Type) => {
  console.log({Id});
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      //   disableOverlay
      hideDragIndicator>
      <Actionsheet.Content>
        <Box w={'full'}>
          <Text>ActionSheet</Text>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CustomActionSheet;
