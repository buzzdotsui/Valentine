// Mock service - no Google API required

/**
 * Plans a date using mock data.
 */
export const planDate = async (location: string, interests: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const loc = location || "your city";
    const int = interests || "romance";

    return `
Here are some romantic date ideas in ${loc} based on "${int}":

1.  **Sunset Picnic & Stargazing**
    Find a quiet spot in a local park. Bring a cozy blanket, some cheese and wine, and watch the stars come out. Perfect for a relaxed vibe.

2.  **Interactive Cooking Class**
    Find a local workshop where you can learn to make pasta, sushi, or chocolate together. It's messy, fun, and delicious.

3.  **The "Tourist in Your Own City" Date**
    Visit a museum, art gallery, or landmark you've never been to, then grab dessert at a highly-rated cafe nearby.

**Note:** Since I'm running in offline mode, I can't look up specific real-time places, but these ideas work practically anywhere!
    `;
};

/**
 * Analyzes a video memory using mock data.
 */
export const analyzeMemory = async (file: File): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return "This moment captures pure happiness. The lighting is soft, the smiles are genuine, and there's an undeniable spark between the two of you. It looks like a memory worth cherishing forever. You both look so in love! 📸✨";
};

/**
 * Writes a deep love letter using mock data.
 */
export const writeLoveLetter = async (partnerName: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const name = partnerName || "My Love";
    
    return `
My Dearest ${name},

From the moment our paths crossed, my world has been brighter. You are the melody in my quiet moments and the spark in my chaotic ones.

Every day with you feels like a new chapter in a book I never want to end. Your laugh is my favorite sound, and your happiness is my greatest goal.

I promise to stand by you, to grow with you, and to love you more with each passing sunrise. You are my today and all of my tomorrows.

Forever yours,

(Me)
    `;
};