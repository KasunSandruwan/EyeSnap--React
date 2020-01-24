import styled from 'styled-components';

// Material ui imports
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

export const BackButton = styled(IconButton)`
  float: left;
`;

export const TitleWithButton = styled(Typography)`
  margin-top: 9px !important;
`;

export const DangerButton = styled(Button)`
  background-color: #f44336 !important;
  color: #ffffff !important;
`;

export const SmallButton = styled(Button)`
  font-size: 10px !important;
  padding: 2px 10px !important;
`;

export const SmallDangerButton = styled(DangerButton)`
  font-size: 10px !important;
  padding: 2px 10px !important;
`;

export const IDBlock = styled.code`
  background-color: #dddddd;
  padding: 3px;
  border: 1px dashed #b1b1b1;
  border-radius: 2px;
  -webkit-touch-callout: all; /* iOS Safari */
  -webkit-user-select: all; /* Safari */
  -khtml-user-select: all; /* Konqueror HTML */
  -moz-user-select: all; /* Firefox */
  -ms-user-select: all; /* Internet Explorer/Edge */
  user-select: all;

  &::selection {
    background: #ffe88d; /* WebKit/Blink Browsers */
  }
  &::-moz-selection {
    background: #ffe88d; /* Gecko Browsers */
  }
`;
