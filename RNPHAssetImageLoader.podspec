require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'RNPHAssetImageLoader'
  s.version      = package['version']
  s.summary      = package['description']
  s.description  = package['description']
  s.license      = package['license']
  s.author       = package['author']
  s.homepage     = 'https://github.com/hortemo/react-native-phasset-image-loader'
  s.platform     = :ios, '15.0'
  s.swift_version = '5.9'
  s.source       = { git: 'https://github.com/hortemo/react-native-phasset-image-loader' }
  s.static_framework = true
  s.frameworks     = 'Photos'

  s.dependency 'React-Core'

  s.source_files = 'ios/**/*.{h,m,swift}'
end
