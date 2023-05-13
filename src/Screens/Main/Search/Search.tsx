import {useState} from 'react';
import {TextInput, FlatList, View} from 'react-native';
import {Appbar, Divider, IconButton, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../Hooks';
import getStyles from './Search.styles';
import {MainSearchScreenProps} from '../../../Typings/NavigationTypes';
import {PageContainer} from '../../../Containers';
import {ProfileWidget} from '../../../Components';

const Search: React.FC<MainSearchScreenProps> = (props) => {
  const {navigation} = props;

  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  const styles = getStyles(theme);

  return (
    <PageContainer>
      <FlatList
        data={['', '', '']}
        renderItem={() => (
          <View style={styles.item}>
            <ProfileWidget />
          </View>
        )}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={
          <Surface elevation={2}>
            <SafeAreaView style={styles.topContainer}>
              <Appbar.BackAction color={theme.colors.text} onPress={navigation.goBack} />

              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search"
                style={styles.searchInput}
                placeholderTextColor={theme.colors.textLight}
              />

              <IconButton icon="search" />
            </SafeAreaView>
          </Surface>
        }
        ItemSeparatorComponent={Divider}
      />
    </PageContainer>
  );
};

export default Search;
