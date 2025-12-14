# Guide Administrateur NautiCompare

## Accès à l'interface administrateur

L'interface administrateur est accessible à l'URL :
```
https://votre-site.com/#admin
```

Ou en local :
```
http://localhost:5173/#admin
```

## Création d'un compte administrateur

Pour créer un compte administrateur, suivez ces étapes :

### Option 1 : Via le tableau de bord Supabase

1. Connectez-vous à votre projet Supabase : https://supabase.com/dashboard
2. Allez dans l'onglet "Authentication" > "Users"
3. Cliquez sur "Add user" > "Create new user"
4. Remplissez les informations :
   - Email : votre email admin
   - Password : choisissez un mot de passe sécurisé
   - Auto Confirm User : Cochez cette case
5. Cliquez sur "Create user"

### Option 2 : Via SQL (Supabase SQL Editor)

1. Allez dans l'onglet "SQL Editor" de votre projet Supabase
2. Exécutez cette commande (remplacez l'email et le mot de passe) :

```sql
-- Créer un utilisateur admin via l'API Supabase Auth
-- Vous devez utiliser l'interface Supabase pour créer le premier admin
```

## Fonctionnalités de l'admin

Une fois connecté, vous pouvez :

### Gestion des forfaits
- **Voir tous les forfaits** : actifs et inactifs
- **Ajouter un nouveau forfait** :
  - Nom du forfait
  - Marque (optionnel)
  - Description
  - Liste des prestations
  - Tarif personnalisé
  - Statut actif/inactif

- **Modifier un forfait existant** :
  - Tous les champs peuvent être modifiés
  - Les modifications sont visibles immédiatement sur le site public

- **Supprimer un forfait** :
  - Confirmation demandée avant suppression
  - Suppression définitive de la base de données

- **Activer/Désactiver un forfait** :
  - Masquer temporairement un forfait sans le supprimer
  - Les forfaits inactifs n'apparaissent pas sur le site public

### Filtres et organisation
- Filtrer les forfaits par marque
- Voir les forfaits sans marque spécifique (applicables à toutes les marques)

## Sécurité

- Seuls les utilisateurs authentifiés peuvent accéder à l'admin
- Les données sont protégées par Row Level Security (RLS)
- Le site public ne peut voir que les forfaits actifs
- Les administrateurs ont un accès complet en lecture/écriture

## Notes importantes

- Les forfaits inactifs restent dans la base de données mais ne sont pas visibles sur le site public
- La suppression d'un forfait est définitive et ne peut pas être annulée
- Les tarifs sont en format libre (ex: "À partir de 350 €", "Prix sur devis", etc.)
- Les forfaits peuvent être spécifiques à une marque ou applicables à toutes les marques (laisser le champ marque vide)

## Support

Pour toute question ou problème, contactez l'équipe technique.
