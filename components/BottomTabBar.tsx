
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const tabs: TabItem[] = [
  { name: 'home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'search', icon: 'search-outline', activeIcon: 'search' },
  { name: 'library', icon: 'library-outline', activeIcon: 'library' },
  { name: 'profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => onTabPress(tab.name)}
        >
          <Ionicons
            name={activeTab === tab.name ? tab.activeIcon : tab.icon}
            size={24}
            color={activeTab === tab.name ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
