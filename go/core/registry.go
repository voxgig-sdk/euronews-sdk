package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewNewEntityFunc func(client *EuronewsSDK, entopts map[string]any) EuronewsEntity

