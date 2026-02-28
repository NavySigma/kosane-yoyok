
async function testMemberRegister() {
    console.log("=== Test 1: Register Member ===");
    const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            nama_profile: "member_test_" + Date.now(),
            password: "password123",
            no_telp_profile: "081234567890"
        })
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(data, null, 2));
    return data;
}

async function testMemberLogin(username) {
    console.log("\n=== Test 2: Login as Member ===");
    const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ nama_profile: username, password: "password123" })
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("level_profile:", data.data?.level_profile);
}

async function testAdminLogin() {
    console.log("\n=== Test 3: Login as Admin ===");
    const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ nama_profile: "admin", password: "123" })
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("level_profile:", data.data?.level_profile);
}

async function run() {
    const regData = await testMemberRegister();
    const memberName = regData.data?.nama_profile;
    if (memberName) await testMemberLogin(memberName);
    await testAdminLogin();
}

run();
