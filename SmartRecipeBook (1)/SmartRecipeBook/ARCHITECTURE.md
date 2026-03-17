# SmartRecipeBook - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                    (React Frontend)                             │
│                   http://localhost:5000                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/REST API
                             │ JSON Requests/Responses
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
│                    (Laravel Router)                             │
│                   http://localhost:8000/api                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Auth Routes     │ │ Recipe Routes    │ │ Admin Routes     │
│                  │ │                  │ │                  │
│ • Register       │ │ • Get All        │ │ • Stats          │
│ • Login          │ │ • Get One        │ │ • Users          │
│ • Logout         │ │ • Create         │ │ • Recipes        │
│ • Get Me         │ │ • Update         │ │ • Delete User    │
│                  │ │ • Delete         │ │ • Delete Recipe  │
│                  │ │ • Search         │ │                  │
│                  │ │ • User Recipes   │ │                  │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      MIDDLEWARE LAYER                     │
        │                                           │
        │ • Authentication (Sanctum)                │
        │ • CORS Handling                           │
        │ • Request Validation                      │
        │ • Error Handling                          │
        └─────────────────────┬─────────────────────┘
                              │
        ┌─────────────────────▼──────────���──────────┐
        │      CONTROLLER LAYER                     │
        │                                           │
        │ • AuthController                          │
        │ • RecipeController                        │
        │ • AdminController                         │
        └─────────────────────┬─────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      MODEL LAYER (Eloquent ORM)           │
        │                                           │
        │ • User Model                              │
        │ • Recipe Model                            │
        │ • Relationships                           │
        └─────────────────────┬─────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      DATABASE LAYER                       │
        │                                           │
        │ • MySQL Database                          │
        │ • Users Table                             │
        │ • Recipes Table                           │
        │ • Personal Access Tokens Table            │
        └─────────────────────────────────────────┘
```

## Request Flow

### Authentication Flow (Login)

```
1. User submits credentials
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Laravel Router receives request
   ↓
4. AuthController@login method called
   ↓
5. Validate credentials
   ↓
6. Query User model from database
   ↓
7. Verify password hash
   ↓
8. Generate Sanctum token
   ↓
9. Return user + token to frontend
   ↓
10. Frontend stores token in localStorage
```

### Recipe Creation Flow

```
1. User submits recipe form
   ↓
2. Frontend sends POST /api/recipes with token
   ↓
3. Laravel Router receives request
   ↓
4. Sanctum middleware validates token
   ↓
5. RecipeController@store method called
   ↓
6. Validate recipe data
   ↓
7. Create Recipe model instance
   ↓
8. Save to database
   ↓
9. Return created recipe to frontend
   ↓
10. Frontend displays success message
```

## Database Schema

### Users Table
```
users
├── id (BIGINT, PK)
├── username (VARCHAR, UNIQUE)
├── password (VARCHAR, hashed)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Recipes Table
```
recipes
├── id (BIGINT, PK)
├── title (VARCHAR)
├── description (TEXT)
├── ingredients (JSON)
├── instructions (JSON)
├── prep_time (INT)
├── cook_time (INT)
├── servings (INT)
├── difficulty_level (ENUM)
├── image_url (VARCHAR)
├── user_id (BIGINT, FK → users.id)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Personal Access Tokens Table
```
personal_access_tokens
├── id (BIGINT, PK)
├── tokenable_type (VARCHAR)
├── tokenable_id (BIGINT)
├── name (VARCHAR)
├── token (VARCHAR, UNIQUE)
├── abilities (TEXT)
├── last_used_at (TIMESTAMP)
├── expires_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Relationships

```
User (1) ──────────────── (Many) Recipe
  │                           │
  ├─ id                       ├─ id
  ├─ username                 ├─ title
  ├─ password                 ├─ description
  │                           ├─ ingredients
  │                           ├─ instructions
  │                           ├─ prep_time
  │                           ├─ cook_time
  │                           ├─ servings
  │                           ├─ difficulty_level
  │                           ├─ image_url
  │                           └─ user_id (FK)
  │
  └─ Personal Access Tokens (1 to Many)
     ├─ token
     ├─ abilities
     └─ expires_at
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                   │
└─────────────────────────────────────────────────────────┘

1. USER REGISTRATION
   ├─ POST /api/auth/register
   ├─ Validate username (unique, 3-255 chars)
   ├─ Validate password (min 6 chars)
   ├─ Hash password with bcrypt
   ├─ Create user in database
   └─ Return user object

2. USER LOGIN
   ├─ POST /api/auth/login
   ├─ Validate credentials
   ├─ Query user by username
   ├─ Verify password hash
   ├─ Generate Sanctum token
   └─ Return user + token

3. AUTHENTICATED REQUEST
   ├─ Include token in Authorization header
   ├─ Sanctum middleware validates token
   ├─ Attach user to request
   └─ Process request

4. USER LOGOUT
   ├─ POST /api/auth/logout
   ├─ Delete current access token
   └─ Return success message
```

## API Response Structure

### Success Response
```json
{
  "message": "Operation successful",
  "data": {
    "id": 1,
    "username": "john_doe",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}
```

## Middleware Stack

```
Request
  │
  ├─ CORS Middleware
  │  └─ Add CORS headers
  │
  ├─ Request Validation
  │  └─ Validate JSON
  │
  ├─ Authentication (Sanctum)
  │  └─ Validate token (if required)
  │
  ├─ Authorization
  │  └─ Check permissions
  │
  └─ Route Handler
     └─ Controller method
        │
        ├─ Validate input
        ├─ Process business logic
        ├─ Query database
        └─ Return response
```

## File Organization

```
server-laravel/
│
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   └── Recipe.php
│   │
│   └── Http/
│       ├── Controllers/
│       │   ├── AuthController.php
│       │   ├── RecipeController.php
│       │   └── AdminController.php
│       │
│       └── Middleware/
│           └── HandleCors.php
│
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   └── cors.php
│
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   ├── create_recipes_table.php
│   │   └── create_personal_access_tokens_table.php
│   │
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── routes/
│   ├── api.php
│   └── console.php
│
├── public/
│   └── index.php
│
├── bootstrap/
│   └── app.php
│
├── .env
├── composer.json
└── artisan
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                      │
└────��─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   CLIENT (React)                        │
│              Served by Nginx/Apache                      │
│                  HTTPS Only                             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────┐
│              WEB SERVER (Nginx/Apache)                  │
���                                                         │
│  ├─ SSL Certificate                                    │
│  ├─ Reverse Proxy                                      │
│  ├─ Load Balancing                                     │
│  └─ Static File Serving                                │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTP
                         │
┌────────────────────────▼────────────────────────────────┐
│           LARAVEL APPLICATION SERVER                    │
│                                                         │
│  ├─ PHP-FPM                                            │
│  ├─ Laravel Framework                                  │
│  ├─ Eloquent ORM                                       │
│  └─ Sanctum Authentication                             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ TCP
                         │
┌────────────────────────▼────────────────────────────────┐
│              MYSQL DATABASE SERVER                      │
│                                                         │
│  ├─ Users Table                                        │
│  ├─ Recipes Table                                      │
│  ├─ Personal Access Tokens Table                       │
│  ├─ Backups                                            │
│  └─ Replication (optional)                             │
└────────────────────────────────────────────────────────┘
```

## Performance Considerations

```
┌─────────────────────────────────────────────────────────┐
│              PERFORMANCE OPTIMIZATION                   │
└─────────────────────────────────────────────────────────┘

1. CACHING
   ├─ Config caching (php artisan config:cache)
   ├─ Route caching (php artisan route:cache)
   ├─ Query caching (database queries)
   └─ HTTP caching (browser cache)

2. DATABASE
   ├─ Indexes on frequently queried columns
   ├─ Full-text search indexes
   ├─ Connection pooling
   └─ Query optimization

3. API
   ├─ Pagination (15 items per page)
   ├─ Lazy loading relationships
   ├─ Response compression
   └─ Rate limiting

4. FRONTEND
   ├─ Token caching
   ├─ Request debouncing
   ├─ Response caching
   └─ Lazy loading
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                SECURITY LAYERS                          │
└───────────────────────────────────────────────────��─────┘

1. TRANSPORT SECURITY
   ├─ HTTPS/TLS encryption
   ├─ SSL certificates
   └─ Secure headers

2. APPLICATION SECURITY
   ├─ CSRF protection
   ├─ XSS protection
   ├─ SQL injection prevention (Eloquent)
   ├─ Input validation
   └─ Output encoding

3. AUTHENTICATION
   ├─ Password hashing (bcrypt)
   ├─ Bearer token authentication
   ├─ Token expiration
   └─ Token revocation

4. AUTHORIZATION
   ├─ User ownership verification
   ├─ Role-based access control
   └─ Permission checking

5. DATA PROTECTION
   ├─ Database encryption
   ├─ Backup encryption
   ├─ Secure password storage
   └─ PII protection
```

## Scalability Considerations

```
┌─────────────────────────────────────────────────────────��
│              SCALABILITY ARCHITECTURE                   │
└─────────────────────────────────────────────────────────┘

HORIZONTAL SCALING
├─ Multiple Laravel instances
├─ Load balancer (Nginx/HAProxy)
├─ Session storage (Redis)
└─ Database replication

VERTICAL SCALING
├─ Increase server resources
├─ Optimize database queries
├─ Implement caching
└─ Use CDN for static files

MONITORING
├─ Application logs
├─ Database performance
├─ Server metrics
└─ Error tracking
```

---

This architecture provides a solid foundation for the SmartRecipeBook application with room for growth and optimization.
