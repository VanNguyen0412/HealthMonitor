from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .prediction import HypertensionPredictor

class PredictView(APIView):
    def post(self, request, format=None):
        data = request.data.get('blood_pressure', [])
        if len(data) != 3 or any(len(day) != 2 for day in data):
            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            blood_pressure_data = []
            for day in data:
                systolic = float(day[0])
                diastolic = float(day[1])
                blood_pressure_data.extend([systolic, diastolic])
        except ValueError:
            return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

        predictor = HypertensionPredictor()
        prediction = predictor.predict(blood_pressure_data)
        return Response({'prediction': prediction})
