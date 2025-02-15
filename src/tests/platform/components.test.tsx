import { render, fireEvent } from '@testing-library/react-native';
import { ActionSheet } from '../../platform/ios/components/ActionSheet';
import { BottomSheet } from '../../platform/android/components/BottomSheet';
import { SegmentedControl } from '../../platform/ios/components/SegmentedControl';
import { TabView } from '../../platform/android/components/TabView';

describe('Platform Components', () => {
  describe('ActionSheet (iOS)', () => {
    const mockOptions = [
      { label: 'Option 1', onPress: jest.fn() },
      { label: 'Option 2', onPress: jest.fn() },
    ];

    it('renders correctly when visible', () => {
      const { getByText } = render(
        <ActionSheet
          visible={true}
          onClose={jest.fn()}
          options={mockOptions}
          title="Test Sheet"
        />
      );

      expect(getByText('Test Sheet')).toBeTruthy();
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
    });

    it('calls onPress when option is selected', () => {
      const { getByText } = render(
        <ActionSheet
          visible={true}
          onClose={jest.fn()}
          options={mockOptions}
        />
      );

      fireEvent.press(getByText('Option 1'));
      expect(mockOptions[0].onPress).toHaveBeenCalled();
    });
  });

  describe('SegmentedControl (iOS)', () => {
    it('renders all segments', () => {
      const { getByText } = render(
        <SegmentedControl
          values={['One', 'Two', 'Three']}
          selectedIndex={0}
          onChange={jest.fn()}
        />
      );

      expect(getByText('One')).toBeTruthy();
      expect(getByText('Two')).toBeTruthy();
      expect(getByText('Three')).toBeTruthy();
    });

    it('calls onChange when segment is pressed', () => {
      const onChange = jest.fn();
      const { getByText } = render(
        <SegmentedControl
          values={['One', 'Two']}
          selectedIndex={0}
          onChange={onChange}
        />
      );

      fireEvent.press(getByText('Two'));
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });
});