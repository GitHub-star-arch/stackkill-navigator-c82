import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import db from '../config.js'
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-navigation';
export default class Donate extends React.Component {

  constructor() {
    super();
    this.state = {
      RequestBookList: [],
    }
  }

  componentDidMount() {
    this.getRequestBookList()
  }

  getRequestBookList = () => {
    db.collection("Requested_Books").onSnapshot((Snapshot) => {
      var RequestBookList = Snapshot.docs.map(document => document.data())
      this.setState({ RequestBookList: RequestBookList })
    })
  }

  render() {
    return (
      <View>
        <Text>Donate</Text>
        <FlatList keyExtractor={(item, index) => { index.toString() }} data={this.state.RequestBookList} renderItem={({ item, i }) => {
          return (
            <ListItem title={item.BookName} subtitle={item.Reason} key={i}
              rightElement={
                <TouchableOpacity
                  style={{ backgroundColor: "orange", width: 100, height: 50, }}
                  onPress={() => { this.props.navigation.navigate("recieverDetails") }}>
                  <Text>
                    Donate
            </Text>
                </TouchableOpacity>}>

            </ListItem>
          )
        }}>

        </FlatList>
      </View>
    );
  }
}