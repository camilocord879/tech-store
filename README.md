# TechStore Backend

Backend desarrollado para la plataforma **TechStore**, una tienda virtual de tecnología que permite gestionar productos, usuarios, carrito de compras y mensajes de contacto.

## Tecnologías Utilizadas

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL (Supabase)
* Zod
* JWT (próximamente)
* Bcrypt (próximamente)

---

## Arquitectura del Proyecto

```text
src/
│
├── config/
│   └── prisma.ts
│
├── controllers/
│   ├── auth.controller.ts
│   └── product.controller.ts
│
├── services/
│   ├── auth.service.ts
│   └── product.service.ts
│
├── routes/
│   ├── auth.routes.ts
│   └── product.routes.ts
│
├── schemas/
│   ├── auth.schema.ts
│   └── product.schema.ts
│
├── app.ts
└── server.ts
```

---

## Base de Datos

La aplicación utiliza PostgreSQL alojado en Supabase y administrado mediante Prisma ORM.

### Modelo Product

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  image       String
  category    String
  stock       Int
  featured    Boolean  @default(false)

  createdAt   DateTime @default(now())
}
```

---

## Instalación

### Clonar repositorio

```bash
git clone <repository-url>
cd backend
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear archivo `.env`

```env
DATABASE_URL="postgresql://usuario:password@host:5432/postgres"
PORT=3000
JWT_SECRET=super_secret_key
```

### Generar cliente Prisma

```bash
npx prisma generate
```

### Ejecutar migraciones

```bash
npx prisma migrate dev
```

### Iniciar servidor

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

## Endpoints Implementados

### Productos

#### Obtener todos los productos

```http
GET /api/products
```

Respuesta:

```json
[
  {
    "id": "uuid",
    "name": "Mouse Gamer",
    "price": 120000
  }
]
```

---

#### Obtener producto por ID

```http
GET /api/products/:id
```

---

#### Crear producto

```http
POST /api/products
```

Body:

```json
{
  "name": "Mouse Gamer RGB",
  "description": "Mouse gamer profesional",
  "price": 120000,
  "image": "https://imagen.com/mouse.jpg",
  "category": "Perifericos",
  "stock": 20,
  "featured": true
}
```

---

#### Actualizar producto

```http
PUT /api/products/:id
```

Body:

```json
{
  "price": 150000,
  "stock": 50
}
```

---

#### Eliminar producto

```http
DELETE /api/products/:id
```

---

## Funcionalidades Implementadas

* CRUD completo de productos.
* Conexión a PostgreSQL mediante Supabase.
* Prisma ORM.
* Arquitectura por capas (Routes, Controllers, Services).
* Validaciones con Zod.
* API RESTful.
* Uso de UUID para identificadores.

---

## Funcionalidades Próximas

* Registro de usuarios.
* Inicio de sesión con JWT.
* Middleware de autenticación.
* Gestión de carrito de compras.
* Mensajes de contacto.
* Dashboard administrativo.
* Integración con frontend React.

---

## Autor

Proyecto académico desarrollado para la asignatura Diseño de Interfaces de Usuario UX.

Universidad / Institución Académica

2026
