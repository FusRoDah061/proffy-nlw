import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher {
  id: number;
  user_id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher,
  isFavorite: boolean
}

const TeacherItem:React.FC<TeacherItemProps> = ({ teacher, isFavorite }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  
  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`);
    api.post('connections', {
      user_id: teacher.user_id
    });
  }
  
  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray:Teacher[] = [];

    if(favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavoriteState) {
      const index = favoritesArray.findIndex((favorite:Teacher) => {
        return favorite.id == teacher.id;
      });

      favoritesArray.splice(index, 1);
      setIsFavoriteState(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavoriteState(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{ teacher.name }</Text>
          <Text style={styles.subject}>{ teacher.subject }</Text>
        </View>
      </View>

      <Text style={styles.bio}>{ teacher.bio }</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {' '}
          <Text style={styles.priceValue}>R$ { teacher.cost }</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavoriteState ? styles.favorited : {}
            ]}
          >
            { isFavoriteState 
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          
          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;