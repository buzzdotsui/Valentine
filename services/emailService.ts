/**
 * Sends an email notification using Formspree.
 */
export const sendProposalNotification = async (noAttempts: number) => {
    const FORMSPREE_ID = "mpqldapg"; 
    
    try {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: "💖 Valentine Proposal Answered!",
                message: "She said YES!",
                details: `She finally clicked Yes after hesitating (hovering/clicking No) ${noAttempts} times.`,
                timestamp: new Date().toLocaleString()
            })
        });
        console.log("Notification sent successfully!");
    } catch (error) {
        console.error("Failed to send notification:", error);
    }
};