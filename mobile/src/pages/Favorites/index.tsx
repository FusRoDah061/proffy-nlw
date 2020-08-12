import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites () {
  const [favorites, setFavorites] = useState<Teacher[]>([]);
  
  async function loadFavorites() {
    const favoritesArrayText = await AsyncStorage.getItem('favorites');

    if(favoritesArrayText) {
      const favoriteTeacher = JSON.parse(favoritesArrayText);
      setFavorites(favoriteTeacher);
    }
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher:Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher} 
              isFavorite
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;