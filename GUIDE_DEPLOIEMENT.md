# Guide de Déploiement - Baeza Marine

## Étape 1 : Déployer sur Vercel (5 minutes)

### A. Créer un compte Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up" (S'inscrire)
3. Choisissez "Continue with Email" ou "Continue with GitHub"
4. Suivez les instructions pour créer votre compte

### B. Déployer votre site
1. Une fois connecté, cliquez sur "Add New..." puis "Project"
2. Choisissez "Import Git Repository" OU "Deploy from Template"
3. Si vous avez votre projet sur votre ordinateur :
   - Cliquez sur l'onglet "Import" en haut
   - Glissez-déposez tout le dossier du projet
4. Vercel détectera automatiquement Vite
5. Cliquez sur "Deploy"
6. Attendez 2-3 minutes que le déploiement se termine

✅ Votre site est maintenant en ligne avec une adresse temporaire Vercel (ex: baeza-marine-xxx.vercel.app)

---

## Étape 2 : Configurer votre domaine baeza-marine.com

### A. Dans Vercel
1. Sur la page de votre projet, cliquez sur "Settings" (Réglages)
2. Dans le menu de gauche, cliquez sur "Domains"
3. Entrez "baeza-marine.com" dans le champ
4. Cliquez sur "Add"
5. Vercel va afficher les enregistrements DNS à configurer. **NOTEZ-LES** :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### B. Dans IONOS (Configuration DNS)
1. Connectez-vous à votre compte IONOS (https://www.ionos.fr)
2. Allez dans "Domaines et SSL" → "baeza-marine.com"
3. Cliquez sur "Gérer les DNS" ou "Paramètres DNS"
4. **Supprimez** tous les anciens enregistrements A et CNAME existants
5. **Ajoutez les nouveaux enregistrements** notés depuis Vercel :

   **Enregistrement 1 :**
   - Type : A
   - Hôte : @ (ou laissez vide)
   - Valeur : 76.76.21.21
   - TTL : 3600 (ou automatique)

   **Enregistrement 2 :**
   - Type : CNAME
   - Hôte : www
   - Valeur : cname.vercel-dns.com
   - TTL : 3600 (ou automatique)

6. Cliquez sur "Enregistrer" ou "Sauvegarder"

### C. Attendre la propagation
- Attendez 10 minutes à 2 heures (généralement 20-30 minutes)
- Testez en allant sur https://baeza-marine.com
- Si ça ne fonctionne pas immédiatement, c'est normal, attendez un peu plus

---

## Étape 3 : (OPTIONNEL) Transférer votre domaine vers Cloudflare

Si vous voulez transférer votre domaine depuis IONOS vers Cloudflare (moins cher, meilleur contrôle) :

### A. Créer un compte Cloudflare
1. Allez sur https://www.cloudflare.com
2. Créez un compte gratuit
3. Cliquez sur "Add a Site"
4. Entrez "baeza-marine.com"
5. Choisissez le plan "Free"

### B. Configurer les DNS
1. Cloudflare va scanner vos DNS actuels
2. Ajoutez les enregistrements Vercel (comme à l'étape 2A)
3. Cloudflare vous donnera 2 serveurs de noms (nameservers), exemple :
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

### C. Changer les nameservers chez IONOS
1. Dans IONOS, allez dans les paramètres de baeza-marine.com
2. Trouvez "Serveurs de noms" ou "Nameservers"
3. Remplacez par les serveurs Cloudflare
4. Attendez 24-48h pour la propagation

### D. Initier le transfert (après propagation DNS)
1. Dans Cloudflare, allez dans "Registrar" → "Transfer Domain"
2. Entrez votre code de transfert : `zhhd5d!`
3. Suivez les instructions
4. Le transfert prend 5-7 jours

---

## En cas de problème

### Le site ne s'affiche pas
- Videz le cache de votre navigateur (Ctrl+Shift+R sur PC, Cmd+Shift+R sur Mac)
- Testez sur https://dnschecker.org pour voir si le DNS a propagé
- Attendez encore 30 minutes

### Erreur SSL/HTTPS
- Vercel active automatiquement le certificat SSL
- Ça peut prendre 10-20 minutes après la configuration DNS
- Rafraîchissez la page plusieurs fois

### Le domaine ne se connecte pas
- Vérifiez que vous avez bien supprimé les anciens enregistrements DNS
- Vérifiez que les enregistrements DNS correspondent exactement à ceux de Vercel
- Vérifiez dans Vercel que le domaine est bien ajouté

---

## Support

- Documentation Vercel : https://vercel.com/docs
- Support IONOS : https://www.ionos.fr/assistance
- Support Cloudflare : https://support.cloudflare.com

---

**Votre site sera accessible sur :**
- https://baeza-marine.com
- https://www.baeza-marine.com
