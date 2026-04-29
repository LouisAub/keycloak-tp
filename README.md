# Keycloak JWT SSO - TP - Louis Aubert

## Objectif
Mettre en place une authentification SSO avec Keycloak et une application React permettant de récupérer et afficher le payload d'un JWT.

---

## Stack utilisée
- Keycloak (Docker)
- React
- OAuth2 / OpenID Connect
- JWT
- http-proxy-middleware (CORS)

---

## 1. Lancer Keycloak

```bash
docker run -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.0.1 start-dev
```

Accès : http://localhost:8080  
Login : `admin` / `admin`

---

## 2. Configuration Keycloak

**Realm :**
- `louis-tp-iam`

**Client :**
- `client_id` : `my-client`
- Client Authentication : ON
- Direct Access Grants : ON

**Utilisateur :**
- username : `user1`
- password : `password1`

---

## 3. Lancer l'application React

```bash
cd keycloak-jwt-app
npm install
npm start
```

Accès : http://localhost:3000

---

## 4. Fonctionnement

1. L'utilisateur se connecte avec ses identifiants Keycloak
2. Une requête OAuth2 est envoyée à Keycloak
3. Un access token JWT est retourné
4. Le token est décodé côté front
5. Le payload est affiché dans un tableau HTML

---

## 5. Proxy CORS

Un proxy (`http-proxy-middleware`) est utilisé pour éviter les erreurs CORS entre :
- React (`localhost:3000`)
- Keycloak (`localhost:8080`)

Fichier : `src/setupProxy.js`

---

## 6. Résultat attendu

- Login fonctionnel
- JWT récupéré
- Payload affiché dans un tableau HTML

---

## 7. SSO

Keycloak agit comme fournisseur d'identité central (SSO via OpenID Connect), permettant une authentification unique réutilisable par plusieurs applications.
```
