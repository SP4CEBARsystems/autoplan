//chat GPT snippet

import React, { Component } from 'react';
import { View, ScrollView, Text, PanResponder } from 'react-native';

class Example extends Component {
  constructor(props) {
    super(props);
    this._panResponders = [1, 2, 3].map((_, index) => (
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          console.log(`PanResponder ${index} moved`);
        },
      })
    ));
  }

  render() {
    return (
      <ScrollView>
        {[1, 2, 3].map((_, index) => (
          <View
            key={index}
            {...this._panResponders[index].panHandlers}
            style={{ height: 100 }}
          >
            <Text>{`Item ${index}`}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}