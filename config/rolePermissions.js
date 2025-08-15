const rolePermissions = {
    admin: [
        'users:create', 'users:read', 'users:update', 'users:delete'
    ],
    user: [
        'content:read'
    ]
};

module.exports = rolePermissions;