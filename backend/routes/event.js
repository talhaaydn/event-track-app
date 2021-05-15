const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Keyword = require("../models/Keyword");
const User = require("../models/User");

const DATA = [
	{
		title: "CMYLMZ - Diamond - Elite - Platinum - Plus",
		page_url: "https://www.biletix.com/etkinlik/Z6G10/TURKIYE/tr",
		image_url: "http://www.biletix.com/static/images/live/event/eventimages/y6g01.png",
		date: "2021-05-20T17::00",
		place: "Türker İnanoğlu Maslak Show Center",
		city: "İstanbul",
		content:
			"Bir Cem Yılmaz Gösterisi Tadında Bir Cem Yılmaz Gösterisi!\n\n* Bu bileti satın alarak gösteriyi izleyen her seyirci, gösterinin kayıt altına alınmasına ve her türlü kaydın kullanımına herhangi bir bedel talep etmeksizin gayri kabulü rücu olarak muvafakat etmiştir. Gösterinin tüm telif hakkı CMYLMZ - Fikir Sanat Film Yapım Reklam ve Pazarlama Tic. Ltd. Şti.'ne ait olup, gösteriye katılan hiç kimse telif hakkı talebinde bulunamaz.",
	},
	{
		title: "CMYLMZ - Diamond - Elite - Platinum - Plus",
		page_url: "https://www.biletix.com/etkinlik/Z6G11/TURKIYE/tr",
		image_url: "http://www.biletix.com/static/images/live/event/eventimages/y6g01.png",
		date: "2021-05-21T17::00",
		place: "Türker İnanoğlu Maslak Show Center",
		city: "İstanbul",
		content:
			"Bir Cem Yılmaz Gösterisi Tadında Bir Cem Yılmaz Gösterisi!\n\n* Bu bileti satın alarak gösteriyi izleyen her seyirci, gösterinin kayıt altına alınmasına ve her türlü kaydın kullanımına herhangi bir bedel talep etmeksizin gayri kabulü rücu olarak muvafakat etmiştir. Gösterinin tüm telif hakkı CMYLMZ - Fikir Sanat Film Yapım Reklam ve Pazarlama Tic. Ltd. Şti.'ne ait olup, gösteriye katılan hiç kimse telif hakkı talebinde bulunamaz.",
	},
];

router.get("/event", async (req, res) => {
	const USER_ID = "60a048832f10a74e834d94ea";

	const user = await User.findById(USER_ID).populate("events");

	return res.json({ status: 200, message: "Events found for the user.", data: user.events });
});

router.get("/event/:id", async (req, res) => {
	const event = await Event.findById(req.params.id);

	return res.json({ status: 200, message: "Event found.", data: event });
});

router.get("/event-search", async (req, res) => {
	const USER_ID = "60a048832f10a74e834d94ea";
	const keyword = req.query.keyword;

	const searchedKeywordIsExist = await Keyword.findOne({ name: keyword });
	const user = await User.findById(USER_ID).populate({ path: "events", name: { $ne: searchedKeywordIsExist._id } });

	// Daha önce aranan anahtar kelime eklenmiş. Demekki aranan anahtar kelimeye bağlı etkinlikler var.
	// Etkinlikleri bul.
	if (searchedKeywordIsExist !== null) {
		// Aranan anahtar kelimeye bağlı etkinlikler daha önce kullanıcıya eklendiyse doğrudan kullanıcıya eklenen etkinlikleri bul.
		if (user.events.length > 0) {
			return res.json({ status: 200, message: `Events found for the keyword ${keyword}.`, data: user.events });
		}

		// Daha önce kullanıcıya aranan anahtar kelimeye bağlı bir etkinlik eklenmemiştir.
		// Bu durumda events schema da bulunan anahtar kelimeye bağlı etkinlikleri getir.
		const events = await Event.find({ keyword: searchedKeywordIsExist._id });

		// Events added to user.
		events.map((event) => user.events.push(event));
		await user.save();

		return res.json({ status: 200, message: `Events found for the keyword ${keyword}.`, data: events });
	}
	// İstenen anahtar kelime veri tabanına daha önce kayıt edilmemiş. Demekki bu anahtar kelimeye bağlı etkinlikler yok.
	// Python - Bot çalıştırıp ordan gelen etkinlik varsa anahtar kelimeyi veri tabanına kaydet.
	// Daha sonra etkinlikleri veri tabanına kaydet.
	else {
		const events = DATA;

		if (events.length === 0) {
			return res.json({ status: 404, message: `No event was found for the keyword ${keyword}.`, data: [] });
		}

		// New keyword created.
		const newKeyword = new Keyword({ name: keyword });
		try {
			await newKeyword.save();
		} catch (err) {
			return res.status(500).send(err);
		}

		for (event of events) {
			// New keyword id added to each event.
			event.keyword = newKeyword._id;

			// Event created.
			var newEvent = new Event(event);
			await newEvent.save();

			// Event added to user.
			user.events.push(newEvent);
		}

		await user.save();

		return res.json({
			status: 200,
			message: `New events have been created for the keyword ${keyword}.`,
			data: events,
		});
	}
});

module.exports = router;
