const plantApiData = [
  {
    id: 1,
    service: "A30",
    category: "Volvo Articulated Dump Trucks",
    category_page_url:
      "https://vrents.com.au/plant-hire/articulated-dump-trucks/",
    model: "Volvo A30G (27kl) Articulated Water Truck",
    image_url: "https://vrents.com.au/wp-content/uploads/2023/07/A27.jpeg",
    page_url: "https://vrents.com.au/equipments/a27kl/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 2,
    service: "A30",
    category: "Volvo Articulated Dump Trucks",
    category_page_url:
      "https://vrents.com.au/plant-hire/articulated-dump-trucks/",
    model: "Volvo A30G (30t) Articulated Dump Truck",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/ART_A30G_StageV_Update_1_W_02866_2018_10_RF.jpg",
    page_url: "https://vrents.com.au/equipments/a30g/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 3,
    service: "A45",
    category: "Volvo Articulated Dump Trucks",
    category_page_url:
      "https://vrents.com.au/plant-hire/articulated-dump-trucks/",
    model: "Volvo A45G (45t) Articulated Dump Truck",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/ART_A45G_StageV_2_W_13105_2018_10_LF_web.jpg",
    page_url: "https://vrents.com.au/equipments/a45g/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 4,
    service: "ECR18",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR18E (1.8t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/CEX_ECR18E_2_W_RR.jpg",
    page_url: "https://vrents.com.au/equipments/ecr18e/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 5,
    service: "ECR35",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR35D (3.5t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/CEX_ECR35D_W_RF.jpg",
    page_url: "https://vrents.com.au/equipments/ecr35d/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 6,
    service: "ECR58",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR58F (5.8t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/CEX_ECR58F_StageV_T4f_1_W_RR.jpg",
    page_url: "https://vrents.com.au/equipments/ecr58f/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 7,
    service: "ECR88",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR88D (8.8t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/CEX_ECR88D_W_LF_co.jpg",
    page_url: "https://vrents.com.au/equipments/ecr88d/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 8,
    service: "ECR145",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR145EL (14t) Excavvator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_ECR145E_W_LR.jpg",
    page_url: "https://vrents.com.au/equipments/ecr145el/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 9,
    service: "EC220",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo EC220EL (22t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_EC220_W_2_LR-1.jpg",
    page_url: "https://vrents.com.au/equipments/ec220el/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 10,
    service: "ECR235",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR235EL (23.5t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_ECR235E_W_LR.jpg",
    page_url: "https://vrents.com.au/equipments/ecr235el/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 11,
    service: "EC300",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo EC300EL (30t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_EC300_CN4_2_W_LR.jpg",
    page_url: "https://vrents.com.au/equipments/ec300el/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 12,
    service: "ECR355",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo ECR355EL (35t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_ECR355E_T4f_2_W_RR.jpg",
    page_url: "https://vrents.com.au/equipments/ecr355el/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 13,
    service: "EC480",
    category: "Volvo Excavators",
    category_page_url: "https://vrents.com.au/plant-hire/excavators/",
    model: "Volvo EC480D (48t) Excavator",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/EXC_EC480D_W_002_LR.jpg",
    page_url: "https://vrents.com.au/equipments/ec480d/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 14,
    service: "L60",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L60H (13t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L60H_T4f_2_W_29424_LR.jpg",
    page_url: "https://vrents.com.au/equipments/l60h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 15,
    service: "L70",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L70H (15t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L70H_T4f_2_W_29424_RR.jpg",
    page_url: "https://vrents.com.au/equipments/l70h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 16,
    service: "L90",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L90H (17t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L90H_T4f_1_W_29424.jpg",
    page_url: "https://vrents.com.au/equipments/l90h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 17,
    service: "L120",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L120H (21t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L120H_T4f_W_1_LF.jpg",
    page_url: "https://vrents.com.au/equipments/l120h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 18,
    service: "L150",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L150H (26t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L150H_2_W_LF.jpg",
    page_url: "https://vrents.com.au/equipments/l150h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 19,
    service: "L180",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L180H (29t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L180H_2_W_LF.jpg",
    page_url: "https://vrents.com.au/equipments/l180h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 20,
    service: "L220",
    category: "Volvo Wheel Loaders",
    category_page_url: "https://vrents.com.au/plant-hire/wheel-loaders/",
    model: "Volvo L220H (31t) Wheel Loader",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/WLO_L220H_T4f_2_W_LF.jpg",
    page_url: "https://vrents.com.au/equipments/l220h/",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 21,
    service: "HB29",
    category: "Excavator Attachments",
    category_page_url:
      "https://vrents.com.au/plant-hire/excavator-attachments/",
    model: "Volvo Hydraulic Hammers",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/hb22-600x459-1.jpeg",
    page_url: "",
    availability: 1,
    phone: "tel:+61882623945",
  },
  {
    id: 22,
    service: "WLA",
    category: "Wheel Loader Attachments",
    category_page_url:
      "https://vrents.com.au/plant-hire/wheel-loader-attachments/",
    model: "Wheel Loader Attachments",
    image_url:
      "https://vrents.com.au/wp-content/uploads/2023/07/Loader-Attach-High-Lift-Bucket.jpg",
    page_url: "",
    availability: 1,
    phone: "tel:+61882623945",
  },
];

const faultReportApiData = [
  {
    frid: 33,
    plantCode: "EC300-2",
    plantNo: "3849",
    plantDescription: "Volvo EC300EL (30t) Excavator",
    orderid: "8174",
    meterReading: "2853",
    image2:
      "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",
    image1: "",
    submittedBy: "Paul Martin",
    contactNo: "0404897780",
    submittedDate: "23/08/2023",
    submittedType: "GEST",
    comment: "Its all falling apart",
    status: "Resolved",
    severity: "CT",
    location: "",
    woNo: "123456",
    resolvedBy: "David Wright",
    resolvedDate: "04/09/2013",
  },
  {
    frid: 34, //FaultReport Table
    plantNo: "3849",
    plantCode: "EC300-2", //PlantNo -> EquimpentMaster.PlantCode
    plantDescription: "Volvo EC300EL (30t) Excavator", //PlantDescription -> EquimpentMaster.PlantDescription
    orderid: "8174", //FaultReport Table
    meterReading: "2853", //FaultReport Table
    image1: "", //FaultReport Table
    image2: "", //FaultReport Table
    submittedBy: "Paul Martin", //GEST | OPTR Tables
    contactNo: "0404897780", //GEST | OPTR Tables
    submittedDate: "23/08/2023", //FaultReport Table
    submittedType: "GEST", //FaultReport Table
    comment: "Wonky bucket", //FaultReport Table
    status: "Open", //FaultReport Table
    severity: "NCT", //FaultReport Table
    location: "", //FaultReport Table
    woNo: "123456", //FaultReport Table
    resolvedBy: "David Wright", //FaultReport Table
    resolvedDate: "04/09/2013", //FaultReport Table
  },
];

const scheduleData = [
  {
    "pclId": "ONCCL3762",
    "roId": 8141,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "01-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3763",
    "roId": 8142,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "02-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3764",
    "roId": 8143,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "03-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3765",
    "roId": 8144,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "04-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3766",
    "roId": 8145,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "05-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3767",
    "roId": 8146,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "06-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3768",
    "roId": 8147,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "07-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3769",
    "roId": 8148,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "08-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3770",
    "roId": 8149,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "09-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3771",
    "roId": 8150,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "10-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3772",
    "roId": 8151,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "11-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3773",
    "roId": 8152,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "12-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3774",
    "roId": 8153,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "13-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3775",
    "roId": 8154,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "14-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3776",
    "roId": 8155,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "15-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3777",
    "roId": 8156,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "16-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3778",
    "roId": 8157,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "17-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3779",
    "roId": 8158,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "18-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3780",
    "roId": 8159,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "19-07-2023",
    "response": "OFF"
  },
  {
    "pclId": "ONCCL3781",
    "roId": 8160,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "20-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3782",
    "roId": 8161,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "21-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3783",
    "roId": 8162,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "22-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3784",
    "roId": 8163,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "23-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3785",
    "roId": 8164,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "24-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3786",
    "roId": 8165,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "25-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3787",
    "roId": 8166,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "26-07-2023",
    "response": "ON"
  },
  {
    "pclId": "ONCCL3788",
    "roId": 8167,
    "plantCode": "L70-2",
    "meterReading": "78000KM",
    "dueDate": "27-07-2023",
    "response": "OFF",
  },
];

const serviceData = [
  {
    "serviceId": "1",
    "pclId": "330",
    "date": "23/04/18",
    "type": "Maintenance",
    "description": "Change the Oil"
  },
  {
    "serviceId": "2",
    "pclId": "330",
    "date": "15/06/18",
    "type": "Maintenance",
    "description": "Tire rotation and balance"
  },
  {
    "serviceId": "3",
    "pclId": "330",
    "date": "02/08/18",
    "type": "Maintenance",
    "description": "Replace air filter"
  },
  {
    "serviceId": "4",
    "pclId": "330",
    "date": "10/10/18",
    "type": "Maintenance",
    "description": "Brake inspection"
  },
  {
    "serviceId": "5",
    "pclId": "330",
    "date": "18/12/18",
    "type": "Maintenance",
    "description": "Coolant flush"
  },
  {
    "serviceId": "6",
    "pclId": "330",
    "date": "05/02/19",
    "type": "Maintenance",
    "description": "Transmission fluid change"
  },
  {
    "serviceId": "7",
    "pclId": "330",
    "date": "20/04/19",
    "type": "Maintenance",
    "description": "Replace spark plugs"
  },
  {
    "serviceId": "8",
    "pclId": "330",
    "date": "10/06/19",
    "type": "Maintenance",
    "description": "Battery replacement"
  },
  {
    "serviceId": "9",
    "pclId": "330",
    "date": "28/08/19",
    "type": "Maintenance",
    "description": "Wheel alignment"
  },
  {
    "serviceId": "10",
    "pclId": "330",
    "date": "15/10/19",
    "type": "Maintenance",
    "description": "Exhaust system check"
  },
  {
    "serviceId": "11",
    "pclId": "330",
    "date": "03/12/19",
    "type": "Maintenance",
    "description": "Replace fuel filter"
  },
  {
    "serviceId": "12",
    "pclId": "330",
    "date": "20/01/20",
    "type": "Maintenance",
    "description": "Power steering fluid change"
  },
  {
    "serviceId": "13",
    "pclId": "330",
    "date": "15/03/20",
    "type": "Maintenance",
    "description": "Brake pad replacement"
  },
  {
    "serviceId": "14",
    "pclId": "330",
    "date": "10/05/20",
    "type": "Maintenance",
    "description": "Cooling system check"
  },
  {
    "serviceId": "15",
    "pclId": "330",
    "date": "28/07/20",
    "type": "Maintenance",
    "description": "Transmission flush"
  },
  {
    "serviceId": "16",
    "pclId": "330",
    "date": "15/09/20",
    "type": "Maintenance",
    "description": "Replace cabin air filter"
  },
  {
    "serviceId": "17",
    "pclId": "330",
    "date": "10/11/20",
    "type": "Maintenance",
    "description": "Wheel balancing"
  },
  {
    "serviceId": "18",
    "pclId": "330",
    "date": "28/01/21",
    "type": "Maintenance",
    "description": "Exhaust pipe repair"
  },
  {
    "serviceId": "19",
    "pclId": "330",
    "date": "15/03/21",
    "type": "Maintenance",
    "description": "Replace serpentine belt"
  },
  {
    "serviceId": "20",
    "pclId": "330",
    "date": "28/05/21",
    "type": "Maintenance",
    "description": "Alignment check"
  },
  {
    "serviceId": "21",
    "pclId": "330",
    "date": "15/07/21",
    "type": "Maintenance",
    "description": "Engine oil flush"
  },
  {
    "serviceId": "22",
    "pclId": "330",
    "date": "10/09/21",
    "type": "Maintenance",
    "description": "Brake fluid change"
  },
  {
    "serviceId": "23",
    "pclId": "330",
    "date": "28/11/21",
    "type": "Maintenance",
    "description": "Coolant system flush"
  },
  {
    "serviceId": "24",
    "pclId": "330",
    "date": "15/01/22",
    "type": "Maintenance",
    "description": "Replace wiper blades"
  },
  {
    "serviceId": "25",
    "pclId": "330",
    "date": "28/03/22",
    "type": "Maintenance",
    "description": "Alignment adjustment"
  },
  {
    "serviceId": "26",
    "pclId": "330",
    "date": "15/05/22",
    "type": "Maintenance",
    "description": "AC system check"
  },
  {
    "serviceId": "27",
    "pclId": "330",
    "date": "28/07/22",
    "type": "Maintenance",
    "description": "Replace brake calipers"
  },
  {
    "serviceId": "28",
    "pclId": "330",
    "date": "15/09/22",
    "type": "Maintenance",
    "description": "Tire pressure check"
  },
  {
    "serviceId": "29",
    "pclId": "330",
    "date": "28/11/22",
    "type": "Maintenance",
    "description": "Engine coolant top-up"
  },
  {
    "serviceId": "30",
    "pclId": "330",
    "date": "15/01/23",
    "type": "Maintenance",
    "description": "Transmission belt replacement"
  }
];

export { plantApiData, faultReportApiData, scheduleData, serviceData };
