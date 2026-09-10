export const templates = [
  { id: 'birthday-story', name: 'Birthday Story', occasion: 'Birthday', icon: 'fa-gift', palette: 'story', description: 'A full interactive birthday adventure with memories, surprises, a mood picker and a candle finale.', featured: true, experienceUrl: 'birthday_template/index.html' },
  { id: 'birthday-confetti', name: 'Birthday Confetti', occasion: 'Birthday', icon: 'fa-cake-candles', palette: 'birthday', description: 'A bright, joyful birthday card with cake, confetti and plenty of cheer.', featured: true },
  { id: 'birthday-sparkle', name: 'Birthday Sparkle', occasion: 'Birthday', icon: 'fa-wand-magic-sparkles', palette: 'sparkle', description: 'A soft, dreamy birthday wish for someone who deserves to shine.', featured: true },
  { id: 'anniversary-roses', name: 'Always Us', occasion: 'Anniversary', icon: 'fa-heart', palette: 'anniversary', description: 'A warm romantic note for celebrating your favourite love story.', featured: true },
  { id: 'friendship-sunshine', name: 'Friendship Sunshine', occasion: 'Friendship', icon: 'fa-user-group', palette: 'friendship', description: 'A sunny thank-you for the friend who makes every day brighter.', featured: true },
  { id: 'congrats-confetti', name: 'You Did It!', occasion: 'Congratulations', icon: 'fa-trophy', palette: 'congratulations', description: 'Big energy for a win worth celebrating.', featured: true },
  { id: 'festival-diwali', name: 'Festival Lights', occasion: 'Festival', icon: 'fa-fire-flame-curved', palette: 'festival', description: 'A glowing festive greeting full of light, warmth and good wishes.', featured: true },
  { id: 'love-note', name: 'A Little Love Note', occasion: 'Love', icon: 'fa-heart', palette: 'love', description: 'A gentle, heartfelt way to say exactly what is in your heart.' },
  { id: 'thank-you-bloom', name: 'Thanks a Bunch', occasion: 'Thank You', icon: 'fa-envelope', palette: 'thanks', description: 'A cheerful little note of gratitude for someone thoughtful.' },
  { id: 'good-luck-charm', name: 'Lucky Charm', occasion: 'Good Luck', icon: 'fa-clover', palette: 'luck', description: 'A pocketful of encouragement for the next big thing.' },
  { id: 'get-well-garden', name: 'Sending Sunshine', occasion: 'Get Well Soon', icon: 'fa-spa', palette: 'well', description: 'A tender, hopeful wish to help someone feel cared for.' }
];

export const occasions = ['All', ...new Set(templates.map(template => template.occasion))];
export const getTemplate = id => templates.find(template => template.id === id);
