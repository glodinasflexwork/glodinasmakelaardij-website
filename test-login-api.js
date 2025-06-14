const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testLogin() {
  try {
    console.log('Testing login API...');
    
    const response = await fetch('https://www.glodinasmakelaardij.nl/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'cihatkaya@glodinas.nl',
        password: 'butdAx-cihza8-tezkax'
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.text();
    console.log('Response body:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
      try {
        const jsonData = JSON.parse(data);
        console.log('Parsed response:', jsonData);
      } catch (e) {
        console.log('Response is not JSON');
      }
    } else {
      console.log('❌ Login failed');
    }
    
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testLogin();

