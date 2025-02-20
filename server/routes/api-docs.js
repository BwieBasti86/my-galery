const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /addCompanyProfile:
 *   post:
 *     summary: Fügt ein Unternehmensprofil zu einer JSON-Datei hinzu
 *     description: Diese Route liest eine JSON-Datei ein, aktualisiert sie mit Unternehmensdaten und speichert sie wieder.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *                 example: "./data.json"
 *               companyId:
 *                 type: string
 *                 example: "techCorp"
 *               companyName:
 *                 type: string
 *                 example: "TechCorp GmbH"
 *               subInfo:
 *                 type: string
 *                 example: "IT-Abteilung"
 *               city:
 *                 type: string
 *                 example: "Berlin"
 *               street:
 *                 type: string
 *                 example: "Musterstraße 1"
 *               zip:
 *                 type: string
 *                 example: "10115"
 *               phone:
 *                 type: string
 *                 example: "+49 30 1234567"
 *               mail:
 *                 type: string
 *                 example: "info@techcorp.de"
 *               jobdescription:
 *                 type: string
 *                 example: "Softwareentwickler"
 *               applicationHeader:
 *                 type: string
 *                 example: "Bewerbung als Softwareentwickler"
 *               applicationLetter:
 *                 type: string
 *                 example: "Sehr geehrte Damen und Herren..."
 *     responses:
 *       200:
 *         description: Unternehmensprofil erfolgreich aktualisiert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "JSON-Datei erfolgreich aktualisiert"
 *                 data:
 *                   type: object
 *       500:
 *         description: Fehler beim Verarbeiten der Datei
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Fehler beim Lesen der Datei"
 */

module.exports = router;
