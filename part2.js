import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Dummy Data
const products = [
  { id: '1', name: 'LED', price: '$100', description: 'This is product 1', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIWFhUXFhUXGBUXFxYWFxcVFRkYFhUVFhgYHSggGBolGxYVITEhJS0rLi4uFx8zODMuNygtMCsBCgoKDg0OGxAQGy8mICYrLTctLjAyNy0vLTgvNS0tMC0vLS01LS0vNi0tKzctLy0vLS0wLS0rLy0tLS0tLTUvLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQEDBAYHCAL/xABPEAABAwEEAwcNDgQGAwEAAAABAAIRAwQSITEFQVEGFyJhcYGRBwgTMlJUkpOhsdHS4RUzNEJTYmNyc6KjssHwFCND0xZEdMLi8SQlNYL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALBEAAgIBBQAABAUFAQAAAAAAAAECEQMEEiExQRMikaEUUWGx8DIzgcHRBf/aAAwDAQACEQMRAD8A7iiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIDTeqjuwqaLszK1Omx7nVQyHzAF1zpwIxwC5gOr7au9aP3/WW09cb8Ao/6gfkevO7KZOSEpN9HYN/20960fv+sqb/AJau9aP3/WXHywjMQsqlYzhOF7AHlEqrkkXhjlJ0jq2/5au9aP3/AFk3/bV3rR+/6y5ZadHubmFhuZCRmpdEzwyh2de3/bV3rQ/E9ZN/21d60PxPWXIbq+FYzao7Dv8Atq71ofiesq7/ALau9KPS/wBK48kIQdh3/rV3pR6X+lU3/rV3pQ6anpXHivprZQlKzr+/9au9KHTU9Koer7a+9KHTU9Zcj7GvktUWS4s69v8Atr70odNT1lTf9tfetn/E9Zciur5UkUdf3/bX3rZ/xPWTf9tneln6anrLkCIQde3/AG2d62fpqesm/wC2zvWz/iesuQogOu7/ALbO9bP+J6yb/tt71s/4nrLkcL6axLJUWzrW/wCW3vWz/ieum/5be9bP+L665O1ivNsxLSRqVXJI0jhlLo6lv+23vWz/AInrL6b1fbZrsln6ag/3Lk9SzkAHarfYypTTKyxyi6aOvb/1q70oeFU9K6D1J+qBU0t/ECrRZTNHsUXC4hwqX8wcoueVeXiF27rZjwrdyWbz1lJQ7oiIgOT9cZ8Ao/6gfkevPFCsWGQV6H6434BR/wBQPyPXnRGrJUnF2ids3Y64g8F2zYeLiUnbbJFJgjJw5xAP6u6CtToOIcCM11ncrQp2ml2NxHZOCW82r97V5Wtm9OlPz9j3NFkjmT3Ln8zTLXb/AOVDmcNkNJ2jU4+b9hRTKYfeIGMEx6FuW6PQvYauDJZkRjg7b+nQtRt1mLHEt1c2H7PlG1W02WE43D0tnjJO+0RbyrcKS0fo91V0NHLxbOnJfJ0c6SLpET5F3fEinVnmfhckkpV2YgpYSeaP19HGvgtV4NIS7OpW3GbxKiwvtqOZGuTxKoYYlTZSKaZdDCVSrSjNY7jjgr7SIxnUqtNGkZqXBavjKF8uVbmKOar8GTv0+FVEAUlCivU6S+GsWQxpAVZM2xQt8gUwr9FsC/dkTEbcz5gsUEu1GP36VOUAWUXObF6SJIvRhBicBgfIscjo7MSTTkvEU0QyjXqBjv5eBOeBjEgE5YbVl2axy+bpDSADOESQ4E8rVAF8wcLwwyz5jmtx3OaNJpvBOBggcgguPHjC5NS/hrdf+Dt0Lc58rr39iN0hY2djbIzl51YEm60cyh7Q9obGXnPLsUvun0gA+4G5CG7Bxnj9K1Wo4nEmVrpYSlFORT/0NRCEtsVyUeZXbOtm7a3cln89ZcRXbutm7a3cln89Zdx4bduzuqIiEHJuuNP/AIND7f8A2OXnVeiOuP8AgND7f/Y5ed0B9MdCmtz2kn0KtOtM3XgkTntEAzlPkUGqtcRkYVMkFOLizXFleN2jtB0kyoQHkVG1CSHYGJm4HfWYI5QBmrOldy7LQ0vYcQ2b2otG3jGM865bZtKPa3PGc9cY9OZzylb5uStdWq9tnc67fGuWh0CcJiejavBzaKWn+eDo9zFqY5evoZOiKtmZWaGNfg1xqEMJuhoMOgAlwwnDIHlC1zS2nWl7xZmcEu98cNRwN1urGTj0KR3S2Z9EvaHYODsW5kDAtMHKSBsPIofRdmbJBibpIGuQWQcMsLxWuDFj/uu2bZMuWT2p0Ytksj6rCbrMNnbnbhOXNrWO2mAIN0GcSRMDHIEEH/pbTuIs7qtuax8XTTfOXagQDt7YhTmnNxzLtR7TJaYP717FbLroYsvw5+pP6nPDCprh8/qcztNEAiC0g8jRz3SYPKseo3VmJ4vOtgtGjADBBiY/ZUda7GBmI2ROPGeNd2PMnRhm0ko3wRbmjUnYp1wr7qBGI2r5r0jK6FI45Ymk20fFLZOCtuV1lnc7Uvo0LsTGPmS1ZDhNx6LLGSsqlQ/eviUhozQ73xGs4Hn284W7aH3FO1tIw1xguPUa3Hi7Z14NG3zLg0mno+BljOuFfpaPc5wYG4nzLbdFWej2eoyq262neh4cHglmLmEN7V0eY5LHs1so0qrnlriScxdwYNQJIOK5JaubbSXNHowxYlXJrWldH9iIpXQJaHF2vGcNmoKhs4bZWmM6lQ+Roj7pU5pp9K0PNVpddN0G5wXS2c5HG1Wv4ak6iWuc4BjHFovmA9zsC83TeMZDAY5rSGZuEd3d8mOWCUnJLjww9zG541nB78GSI4+QLolosjaNMRDcMvaoPcCGts5rVagcQ+6xpIDogauW9G2FC7tt1vZndjpG7TxF7bqw1864M0M+q1Oxf0r3wviy48WHd0u/1Ne3SW2m9xDcTeMu1YTlzKDKuVW4mP8Avk2q0vosUFCKijwtRmeXI5yC7d1s/bW7ks/nrLiK7b1s/b276tn89VaGB3ZERAck64/4FQ+3/wBjl53Xofrj/gVn+3P5HLzwgCIiAq10KR0ZbnNqDhYkgAnGDOBGzM5KNV6jVjCAcQcZzG3y9JVZRTRpjm4ytM3IaSqtFWk55vPbDoMhzTDmukibpnyK7oWqym6DRIq3ahvybrqcjCDheDgRIHlC1/3Te+S97jgAL0wIjIZECBhyLKFse+6xz47Ex0OBvyDwqhORyk68uILz5YOK+p6UNWnK30bHuMqgvqupvh4aGC8QMMXQCTm4hoywwVzSemC3sha947IWkRg1wAh1/wCdIDpHHtCgdF1A2s1jXEMc6k4z8Z1NwM4a4Jj6y+bPbTWjsoAhjW5RkAASNsASeJc2TTp5XN9cfz7HZjzLbSfLNi0HXZaDde4BwIgOEhxyzG0ype07gjU4QuicYxlsZCBgsLcrRo0675F5pi44AcGTkZOAiMVO23TnYDiHxfcYa4EQIwgTtC83USyRyVgZq8k5La/DWK+4x1M8IQTPGCOJRNt0SykeG4NnIQZI2wOTNdNo6e/iA1opReAInOMyTsETjlgtU3YbnxaKza4qUwx1NwDSYILA7DEwZMZQZOK6NFlzznWXgxyapxhUYqzF0Juda9gc2HAzBGIPoVh25F97FoER0bVesOkBYrHZmdkh9epUj5gYSL3HJLRyzHFtujdL/wARTdTfAq3S5rgPfA0ThMcKATGEwUz/AInGnki7Vv7OrL49bCUlCSXhEaP/AIag2JLquN1o1GYkzlGf/wCVIUd0po3KDWguLxLicTfMZHUGkdCidJkuAqBl0yKYvEAOjF0RJBOHSFF17Y181wzsZDgRrLiIDSTxBs8a5oYVk5lz/wBN8rTuzFsOkKJr1C8Fzrzy3M08SS5z2tIc45ACQDOJEY/OktLU3tLRTAxj4ojPU0CdWcxljmoiwMvVHPyALo2DA+xXrNQLyXECAcSIkk5ccnFepLFBSt+UckJN8/mSGiKopUwQRf7LwQJxgA9GvHiVNMAQG1arXVHNc57HAXQ0w4NbhN8DhThgRGRVlrG02uc84tGDdQGydv6lW91mjxVYy00y6o+tDrjRhT1FkDMyCExpPLb99KandHHRgm1Ma03Q6TDgZIgAENAOGUnVz5zH0AK7nCo8hrQSCeEQcmgc+rZKv6Qc2kLszU+MARdYSMWgaztOWEDWVEOrG7G04r04Ljg8eT5KPdBIBkbcp5lZRFuZ2F23rZ+3t31bP56q4ku19bP75bfq0PPUQg7wiIgOR9cf8Cs/25/I5eeF6G65A/8Ah2f7Y/kK88oAiIgCqFRX7JSDjjkBJ/QKG6CL7AahY1rcSQ0Y5kwBhtx8qz9I21lOKVEkhgqMfUIDTULyQ7DHghsNE/OymFGsqXHCPikGeMY/ovvSlngh47WpJzBhwPDbPESDyOCxcU5KzZNpOjKsVrbF0tBAbGzDCSDqdAOKvUrR/Ph0COBrDYGAOAJAjHCc1BAqUpWphDOyNyyeCZgHBp2jyqJ466NseTdXNUbBo7dI+mahwmpDbziXEQ4PJEa70u58lOV7ZTI7JUL5aXEMuRfcAA4HEcEPGJwmCBiDGo2O00KbhUqU+yi9eDb5ZJnCQPi5kjPtcQJn509b61d7qpffvY4TwRqEamjYuN6WMpppUdctTOEWja7NulDbPaRLn1rQS0VDdhtKA0NGsfGwgACFAv0480n0XQadNxh08IGpnn23a5FRLbM91MVA7gE58GA8CC0hvak6gYkY7VWzWc3gbl5xmAYumYk4610vGvfDhU34ZOhbFWt9qpU2NN0YY4hlNslxJyAzxXRaNvFltApANLgWhwc0G4Q4G+DEl2wDbmAZWo6C0y+wvvj+W6Djg5rxnccMQQIEYyCJGOKjrHpGpUe6s58uLrznE6zicM4EpmjHNCmVg3CVmzaff2F0PLy4PvNeXuLX0yZBaybrS0yCBjI41FWy3hzWtdgZvAZQ3ETn++dSdeqalle91QAtqsIdkGiobj2g5gEQT9QFavbrRTMwBBggYuMEZh2rEZT+s8GLCrr8mestQ3Hk+9C1L1W62LxLovZGQcMOLYvi029jAWMe44mcC0hwwmDt6R0qHDCMb0HLPHlgYhXXNbHCmYmRBm9jjl59WS7nhjus5lnntpIve7NYtINQgEOaRES13bYga5U5atPVaVno0CwNrMaReum+KZxY1w7oCeaOOdde5omGxOWcEAxgCMcRPNzKf0ZYGvbWtLi6WFgAcJIe68XROoAbPjaoUZVjik2vfv1/syTnJ1utkDUsrhjHGXSDMiYwPH+8lg1RiTxrNt73Mdg6QR7IhYlSTjtXTBurZySrosoiLQzC7X1tHvlt+pQ89RcUXa+to98tv1KHnqIDvCIiA5D1yHwOz/bO/IvPS9C9ch8Es32zvyFeekAREQBXWYDNWl9lQyUGiSsms+Kd2ZF6RhkYxIPMBzLHZhrVaziYnmUNWyy4TLYCrCo1fWCkhF1lEyBtjPAY8am30HUqQk3QW6oMuDgLpIyzJx2ZYqMstol0YGQRDmtcJ4p5M8wvm0McHEk9tJMZH2LGScnTOj5UvlMmo1pdgAMOPoMY6841K5QfwZFQA9yROPFGIUe2scGuy8o9Gay6lEmoLuIwA82PSoarsonZmGgbpF0EGJETlxZqzRszQQRLHTE4uaZza4HHLYsi3aUqm0F9Qta7EgNEgTiQOX9wsy2aXFZsPgPzaWCJdMQ4nINaMh6Fi3OPS7N4qMk78/nZkUuDZS0tYSamLgXEFobwTwnRAdicshyrWbZRe0NJxa8EggYOgwTyyCFPWd4zaXsxBdPCEZYHIc+ZzWHbNGVYFy64y5pAIDy5j3Nkg5g4XYzAGEqMb2y5fZdtOFKyA14iMUvpWY5ri1zS1wzaQQQdhByVsLtSOFyLobOWA/cBSdG1Op2Z7GOj+YC7LEFoDR03slEydqvUHYOb3Q8oxH6qk42uS+OVP6lqrULsSnZDEbP1XwEWlGVsoiqVRSQF2vraPfLb9Sh56i4ou19bR77bfqUPPUQHeEREByHrkPgdm+2d+Qrz0vQvXIfBLN9s78hXnpAEREAREQFUxX0ANvkV2mP3Chs0jGyyGKraZ1LOawa45llUqA1jHXAB6Fk8tGiw2RVJha4GNazq78AdbTKv13NyuZxt9O1WLQ7HIAkZGOY5qu7c06NPh7U+THbRvnZ6Tq86uWG0Gi+9dJAzExxhVoO4XOMFWowNdDsLpgzOIBOxWb8Znt4tFK9Zxe5xHLq5lfdZKkNqMbLcy7UMJ4WMNWGagJnVJ5jyLP0VputZ6gqU3ZfFOLXDKHDXgSqyUq+UlV6Z9i0yA260cM4zeAGAwBnVPnWO8taQ9zg4DEgOhxBweGnbsGwK/pyvTLxVosY1lVk3LrSGPgsc0SJAyIxwwhQlqdOO3HKBmTkOUrLHFS56N3xFoxq7y5xJM8ZwwGA8i+A1X7oOrV5edfVOnxeZdW6kcvw7Zj3VUPhX6gwyHSsd6lOyGtp8yqIisZBERAF2rraPfbb9Sh56i4qu1dbT77bfqUfzPQHeUREByDrkfglm+2d+Qrz2vR3XAWTstmszb13+a4zE/E5QuHf4fHyp8AeugIJFO/4fHyp8Aeun+Hx8qfAHroCCRTv+Hx8qfAHrp7gD5U+APXQEKF9tfGtS/uAPlT4A9ZU9wB8qfAHrKKLKVEYKs61UVIPbmOInLYpH3BHyh8D/AJJ7hfSfd/5KNqLfEMOjaGtx4RJzyI8qt2h4Jk485Uj7ifP+7/yXwdB/Sfd9qhQV2WeXiiLbXIMjBZLbVOeOflWV7i/SDwfavujoBzjDXgk6oPKpcUyscjRFVaslBUwUvaNzj2EB7gCccQculWvcQ/KDwT6VNEb/AEzdC0XOoOugPdJIYSRAwhzYEEkgiMO1WJXpvdj2K7OqRmM8zgVnWaiWAw43oHCk6uLZyRmV9Vg508IQcSIJx2iTguT4eRTbSOyOaG1Js1+tRcDGUZr5FRw1qUdoySTfz4varZ0R8/7vtXSk/Tnco+MjHVCc18kqV9x/pPu+1fPuP9J932q1GbkRKKW9xvn/AHfaqe43z/u+1SUIpFKHQ/z/ACe1U9yPn+T2oCMXaetp99tn2dH8z1yj3K+f5Pauv9bpZex1rZjM06OqPjPQHckREBEbo9zlC3Mayu0kNdeaWuLSDEHEaoK1/es0f3NXxjlu6IDSd6zR/c1fGuVN6zR/c1fGuW7ogNJ3rNH9zV8Y5U3rNH9zV8Y5buiA0jes0f3NXxhTer0f3NXxh9C3dEBox6lWj9lXxnsTep0f9N4z2LeUQGi71Oj/AKbxnsVD1J7B9N4weqt7RAaEepLo/bW8YPVXE91VAWa2V6NMm7TquY0nEwMpO1eqV5c6of8A9K1/bvQEKy1Oc4AnWBzEr0AOpLo/bW8YPVXnmlmOUL2E3JAaJvTaP+m8Z/xTem0fsreM9i3xEBom9Po7uavjD6FXen0d3NXxrlvSIDRd6fR3c1fGuVN6bR3c1fGuW9ogNEHUm0d3NXxpwTem0d3NXxrlvaIDRd6bRvcVeTsr1Tel0b3FXxr1vaIDRN6XRvcVfGv9KnNzG4+y6PL3WdjgagaHFz3PwbJAEnDMqfRAEREAREQBERAEREAREQBERAEREAXl3qif/Stf2716iXl3qjn/ANna/tneYIDWwV7EZkOQLxw52B5CvY9LIcgQH0iIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIixbfpGlQAdVqNYCYBcYk8SAykUI7dbYh/mWeX0K27dnYR/mG+C8+ZqAn15Z6pLv8A2ls+2PmC9DN3a2E4C0DwKnqrzf1RbSKmkrW9mLXVZaYIkXWiceRAQNR/BPIfMvZdDtW8g8y8WuJg4aivWlPdhY2sbNYDAYXXE5cQQGwotfG7Sw/L/cqeqvpu7Gwn/MDwX+qgJ5FgaO01QrkilVa8gSQJmMpxWegCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgC0vqqlrbK2q8hrWVAC45AOBGPPA51uiw9MaOZaaFWg+QyqxzHFsBwDhBIJ1oDzu/TNmP9dnhK37sWb5ZnSVv56gth75tXTS/tqrOoLYO+LV4VH+0gNBGlqGqq3y+hQ+kXUqhJvA9K68zqG6PH9e1+HR/sq83qK6PH9W1eHS/tIDiFno02mZHlWw0NMUQADUHQ70LqB6i+j/lbT4dP+2rbuolo8/1bV4yl/aQHNzp2zfKt6H+hUGnrN8s3od6F0R3UL0cf61r8ZR/tL43iNHfL2zw6P8AZQEV1NNOUjb6bKb7xe17SAHHC6XycMBLRiV2lahuL6nll0ZUfVovrPc9lw9lcwgNkOMBjG6wM5yW3oAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//9k=' },
  { id: '2', name: 'Gaming Setup', price: '$240', description: 'This is product 2', image: 'data:image/jpeg;base64,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' },
];

const orders = [
  { id: '1', status: 'Delivered', date: '2023-10-01' },
  { id: '2', status: 'Processing', date: '2023-10-05' },
];

// Home Screen
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our Store</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Product Details Screen
const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImageLarge} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

// Cart Screen
const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.cartItem}>Product 1 - $10</Text>
      <Text style={styles.cartItem}>Product 2 - $20</Text>
      <Text style={styles.total}>Total: $30</Text>
      <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

// Checkout Screen
const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      <Text style={styles.text}>Credit Card</Text>
      <Text style={styles.text}>PayPal</Text>
      <Text style={styles.sectionTitle}>Shipping Details</Text>
      <Text style={styles.text}>Address: 123 Main St, City, Country</Text>
      <Button title="Place Order" onPress={() => navigation.navigate('OrderHistory')} />
    </View>
  );
};

// Order History Screen
const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {item.id}</Text>
            <Text style={styles.orderText}>Status: {item.status}</Text>
            <Text style={styles.orderText}>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Profile & Settings Screen
const ProfileSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile & Settings</Text>
      <Text style={styles.sectionTitle}>User Info</Text>
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Email: john.doe@example.com</Text>
      <Button title="Change Theme" onPress={() => alert('Theme Changed')} />
    </View>
  );
};

// Navigation Setup
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="history" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="ProfileSettings"
          component={ProfileSettingsScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productImageLarge: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
