import { View, ScrollView, Text, } from 'react-native';
import { GenerateRandomString } from '../../../../helpers/helpers';
import { ListItem } from './listItem';
import { colors, styles, appDimensions, textColors } from '../../../../style';
import { Space } from '../../../smart/visuals';

export const StoryList = (props) => {

  const { listItemInfo, alternativeText } = props;
  const empty = listItemInfo.length < 1;

  return (
    <View
      style={[{
        flex: 1,
        borderWidth: 2,
        borderRadius: appDimensions.borderRadius,
        borderColor: colors.white,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: colors.light
      },
      (empty && { justifyContent: 'center' })
      ]}

    >
      {empty && <Text style={[styles.paragraph, textColors.white, styles.textCenter]}>
        {alternativeText}
      </Text>}

      {!empty && <ScrollView >
        {props.listItemInfo && props.listItemInfo.map(listItemInfo => (
          <ListItem
            {...props}
            key={GenerateRandomString()}
            listItemInfo={listItemInfo}
          />

        ))}

        {/* <FakeCamps /> */}

        {Space(30)}

      </ScrollView>}

    </View>
  );

}

const FakeCamps = () => {

  return (
    <>
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
      <FakeCamp />
    </>
  )

}

const FakeCamp = () => {

  return (

    <View style={{
      backgroundColor: colors.fire,
      width: '100%',
      marginTop: 5,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
    }} >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Text style={[styles.h3, { color: colors.light }]} numberOfLines={1}>
          Some Camp
        </Text>
      </View>
    </View>

  )
}