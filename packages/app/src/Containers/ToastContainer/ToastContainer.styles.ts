import {StyleSheet} from 'react-native';
import {Spacing} from '../../Styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: Spacing.small,
    gap: Spacing.xsmall,
  },
});
