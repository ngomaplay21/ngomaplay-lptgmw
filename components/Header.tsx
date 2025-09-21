
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showLogo?: boolean;
  rightComponent?: React.ReactNode;
}

export default function Header({ title, showBack, onBackPress, showLogo, rightComponent }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.content}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftSpace} />
        )}

        {showLogo ? (
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>N</Text>
            <Text style={styles.logoSubtext}>NgomaPlay</Text>
          </View>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}

        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    height: 56,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  leftSpace: {
    width: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    fontStyle: 'italic',
    marginRight: 8,
  },
  logoSubtext: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});
