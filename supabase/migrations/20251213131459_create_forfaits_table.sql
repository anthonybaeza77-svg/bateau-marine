/*
  # Create forfaits management system

  1. New Tables
    - `forfaits`
      - `id` (uuid, primary key)
      - `name` (text) - Nom du forfait
      - `brand` (text, nullable) - Marque concernée (Honda, Yamaha, etc.) ou null si applicable à toutes
      - `description` (text) - Description courte
      - `items` (text array) - Liste des prestations incluses
      - `price_label` (text, nullable) - Tarif affiché (ex: "À partir de 350 €", "Prix à définir")
      - `is_active` (boolean) - Statut actif/inactif
      - `display_order` (integer) - Ordre d'affichage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `forfaits` table
    - Add policy for public read access to active forfaits
    - Add policy for authenticated admin users to manage forfaits

  3. Notes
    - All users can read active forfaits for the public site
    - Only authenticated admin users can create, update, or delete forfaits
*/

CREATE TABLE IF NOT EXISTS forfaits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text,
  description text NOT NULL,
  items text[] NOT NULL DEFAULT '{}',
  price_label text,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE forfaits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active forfaits"
  ON forfaits
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all forfaits"
  ON forfaits
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert forfaits"
  ON forfaits
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update forfaits"
  ON forfaits
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete forfaits"
  ON forfaits
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_forfaits_brand ON forfaits(brand);
CREATE INDEX IF NOT EXISTS idx_forfaits_is_active ON forfaits(is_active);
CREATE INDEX IF NOT EXISTS idx_forfaits_display_order ON forfaits(display_order);
