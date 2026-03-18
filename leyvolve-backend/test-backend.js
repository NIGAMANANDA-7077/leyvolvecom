import fetch from 'node-fetch';

async function testBackend() {
    console.log('Testing Leyvolve Backend Email Submission...');
    
    const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        service: 'Web Development',
        message: 'This is a test message to verify the custom backend implementation.'
    };

    try {
        const response = await fetch('http://localhost:5001/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Body:', result);

        if (response.ok && result.success) {
            console.log('✅ Success: Backend is correctly sending emails.');
        } else {
            console.error('❌ Failure: Backend failed to send email.');
        }
    } catch (error) {
        console.error('❌ Error: Could not connect to the backend server. Make sure it is running.', error.message);
    }
}

testBackend();
