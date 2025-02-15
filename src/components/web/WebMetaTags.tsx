import { Platform } from 'react-native';
import { Helmet } from 'react-helmet';

interface WebMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
}

export function WebMetaTags({ 
  title = 'WhisApp - Share Your Travel Stories',
  description = 'Record and share your travel experiences with voice messages and discover hidden gems around the world.',
  image = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200',
}: WebMetaTagsProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}