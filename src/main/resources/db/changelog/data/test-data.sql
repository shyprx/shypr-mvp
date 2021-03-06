-- Insert the initial data needed for the system
--USERS
insert into USERS(ID, USER_TYPE, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL) values (1, 'CARRIER', 'quick', '$2a$10$jmNF/DOY4MrkTb37KHBZP.uZo0OOTJLC.P30zqAY/OeU0N.Y0lxem', 'quick', 'quick', 'quick@elm.sa');
insert into USERS(ID, USER_TYPE, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL) values (2, 'CARRIER', 'aymakan', '$2a$10$jmNF/DOY4MrkTb37KHBZP.uZo0OOTJLC.P30zqAY/OeU0N.Y0lxem', 'aymakan', 'aymakan', 'aymakan@elm.sa');
insert into USERS(ID, USER_TYPE, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL) values (3, 'CARRIER', 'tard', '$2a$10$jmNF/DOY4MrkTb37KHBZP.uZo0OOTJLC.P30zqAY/OeU0N.Y0lxem', 'tard', 'tard', 'tard@elm.sa');
insert into USERS(ID, USER_TYPE, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL) values (4, 'SENDER', 'user', '$2a$10$jmNF/DOY4MrkTb37KHBZP.uZo0OOTJLC.P30zqAY/OeU0N.Y0lxem', 'Bacem', 'Ghali', 'bghali@elm.sa');

--CARRIER
insert into CARRIER(ID, NAME) values (1, 'Quick');
insert into CARRIER(ID, NAME) values (2, 'Aymakan');
insert into CARRIER(ID, NAME) values (3, 'Tard');

--SENDER
insert into SENDER(ID, NAME) values (4, 'testSender');

--SHIPPING_RATES
    --Quick
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_1_D', 26, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_3_D', 20, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_1_D', 31, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_3_D', 25, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_1_D', 36, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_3_D', 30, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_1_D', 41, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_3_D', 35, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_1_D', 46, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_3_D', 40, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_1_D', 51, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_3_D', 45, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_1_D', 56, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_3_D', 50, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_1_D', 71, 1);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_3_D', 55, 1);


    --Aymakan
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_1_D', 24, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_3_D', 18, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_1_D', 29, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_3_D', 23, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_1_D', 38, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_3_D', 32, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_1_D', 43, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_3_D', 37, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_1_D', 44, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_3_D', 38, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_1_D', 49, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_3_D', 43, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_1_D', 54, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_3_D', 48, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_1_D', 61, 2);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_3_D', 55, 2);

    --Tard
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_1_D', 22, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 0, '_3_D', 16, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_1_D', 27, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_0_15', 1, '_3_D', 21, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_1_D', 38, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 0, '_3_D', 32, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_1_D', 40, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('INSIDE_CITY', 'KG_15_30', 1, '_3_D', 34, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_1_D', 47, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 0, '_3_D', 41, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_1_D', 46, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_0_15', 1, '_3_D', 40, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_1_D', 57, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 0, '_3_D', 51, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_1_D', 58, 3);
insert into SHIPPING_RATE(DELIVERY_LOCATION, WEIGHT_CATEGORY, CASH_ON_DELIVERY, DELIVERY_TIME, PRICE, CARRIER_ID) values ('OUTSIDE_CITY', 'KG_15_30', 1, '_3_D', 52, 3);

--REGIONS
insert into region(ID, NAME_AR, NAME_EN) values (1, 'الرياض', 'Al-Riyadh');
insert into region(ID, NAME_AR, NAME_EN) values (2, 'المنطقة الشرقية', 'Al-Sharguia');
insert into region(ID, NAME_AR, NAME_EN) values (3, 'مكة المكرمة', 'Al-Sharguia');

--CITY
insert into city(ID, NAME_AR, NAME_EN, REGION_ID) values (1, 'الرياض', 'Riyadh', 1);
insert into city(ID, NAME_AR, NAME_EN, REGION_ID) values (2, 'الدمام', 'Dammam', 2);
insert into city(ID, NAME_AR, NAME_EN, REGION_ID) values (3, 'جدة', 'Jeddah', 3);

