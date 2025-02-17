import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFirebaseTimestamp(value: any): value is Timestamp {
  return !!value?.toDate;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const converter = <T extends Record<string, any>>() => {
  return {
    toFirestore(data: WithFieldValue<T>) {
      return data;
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions,
    ) => {
      const data = snapshot.data(options);

      // Convert timestamp to date
      (Object.keys(data) as (keyof T)[]).forEach(function (key) {
        const v = data[key];
        data[key] = isFirebaseTimestamp(v) ? v.toDate() : v;
      });

      return {
        ...data,
        id: snapshot.id,
      };
    },
  };
};

export function collectionWithConverter<T extends DocumentData>(
  ref: Firestore | DocumentReference<DocumentData, DocumentData>,
  path: string,
  ...pathSegments: string[]
) {
  if (ref instanceof Firestore) {
    return collection(ref, path, ...pathSegments).withConverter(converter<T>());
  }

  return collection(ref, path, ...pathSegments).withConverter(converter<T>());
}

export function docWithConverter<T extends DocumentData>(
  ref: Firestore | DocumentReference<DocumentData, DocumentData>,
  path: string,
  ...pathSegments: string[]
) {
  if (ref instanceof Firestore) {
    return doc(ref, path, ...pathSegments).withConverter(converter<T>());
  }

  return doc(ref, path, ...pathSegments).withConverter(converter<T>());
}
