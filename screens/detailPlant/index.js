import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const { width } = Dimensions.get('window');

const PlantDetailScreen = ({ route, navigation }) => {
  const { plant } = route.params;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Détails' },
    { key: 'guides', title: 'Guides' },
    { key: 'diagnostics', title: 'Diagnostiques' },
  ]);

  const DetailsRoute = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.descriptionText}>{plant.details}</Text>
  
      <View style={styles.taskItem}>
        <TouchableOpacity style={styles.bouton}>
          <Ionicons name="water" size={24} color="white" style={styles.iconBouton} />
          <Text style={styles.textBouton}>Irriger la plante</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  

  const GuidesRoute = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {plant.guides && plant.guides.map((guide, i) => (
        <View key={i} style={styles.guideItem}>

          <Ionicons name={guide.icon} size={24} color="#6CC51E" style={styles.guideIcon} />
          
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideTitle}>{guide.title}</Text>
            <Text style={styles.guideDescription}>{guide.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
  

  const DiagnosticsRoute = () => (
    <View style={styles.tabContent}>
      {plant.diagnostics && plant.diagnostics.map((diagnostic, i) => (
        <View key={i} style={styles.diagnosticItem}>

          <Text style={styles.diagnosticTitle}>{diagnostic.title}</Text>
          <Text style={styles.diagnosticDescription}>{diagnostic.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderScene = SceneMap({
    details: DetailsRoute,
    guides: GuidesRoute,
    diagnostics: DiagnosticsRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#000"
      inactiveColor="gray"
      pressOpacity={0.8}
    />
  );

  return (
    
      <View style={styles.container}>
        <Image source={plant.image} style={styles.plantImage} />
    
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
    
        <View style={styles.contentCard}>
          <View style={styles.plantInfo}>
            <Text style={styles.plantName}>{plant.current_name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: plant.status === 'Bonne santé' ? '#D6F2C2' : '#F2D2C2' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: plant.status === 'Bonne santé' ? '#6CC51E' : '#E07B7B' }
              ]}>
                {plant.status}
              </Text>
            </View>
          </View>
    
          <Text style={styles.scientificName}>{plant.scientific_name}</Text>
    
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: width - 40 }}
            renderTabBar={renderTabBar}
            style={styles.tabView}
          />
        </View>
      </View>
  
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentCard: {
    flex: 1, 
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
  },
  tabView: {
    flex: 1,
    height: 'auto',
    minHeight: 250,
  },
  
  plantImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius:25,
    marginTop:28,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  contentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop:25,
    // padding: 20,
    height:200,
   
  },
  bouton:{
    backgroundColor:"#7cb518",
    height:44,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    display:'flex',
    flexDirection: 'row',
    marginTop:0,
    width:156,

  },
  iconBouton:{
    marginLeft:10,
  },
  textBouton:{ 
    color:"#fff",
    fontSize:16,
    fontWeight: '900',
    fontFamily:'DMSans',
    marginLeft:5,
    alignSelf: 'center',
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scientificName: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  tabBar: {
    backgroundColor:'#eee',
    
    borderRadius:23,
    shadowColor: 'transparent',
    elevation: 0,
    height: 50,
    // borderBottomWidth: 1,
  },
  tabIndicator: {
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 40,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#000',
  },
  tabContent: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily:'DMSansRegular',
    lineHeight: 24,
    color: '#6e6e6e',
    marginBottom: 20,
  },
  
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  guideIcon: {
    marginRight: 15,
    marginTop: 3,
  },
  guideTextContainer: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight:'700',
    fontFamily:'DMSansBold',
    fontWeight: 'bold',
    color: '#393d37',
    marginBottom: 5,
  },
  guideDescription: {
    fontSize: 13,
    fontFamily:'DMSansRegular',
    color: '#6e6e6e',
    lineHeight: 20,
  },
  diagnosticItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  diagnosticTitle: {
    fontSize: 18,
    fontFamily:'DMSansBold',
    fontWeight: '700',
    color: '#393d37',
    marginBottom: 5,
  },
  diagnosticDescription: {
    fontSize: 15,
    fontFamily:'DMSansRegular',
    fontWeight: '400',

    color: '#6e6e6e',
    lineHeight: 20,
  },
});

export default PlantDetailScreen;