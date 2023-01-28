// VU ID: BC0000000000
// Student Name: VU Pirates
// Contact For payed assignments = +92 319 7247800
// Please Like comment & subscribe.
// Dev 5.11 Working

#include <iostream>
using namespace std;
int a = 0;

class TreeNode
{
private:
    int object;
    TreeNode *left = NULL, *right = NULL;

public:
    TreeNode *getLeft() { return left; }
    void setLeft(TreeNode *newLeft) { this->left = newLeft; }
    TreeNode *getRight() { return right; }
    void setRight(TreeNode *newRight) { this->right = newRight; }
    void isLeaf()
    {
        if (left == NULL && right == NULL)
            cout << "Yes, it is a leaf Node.\n";
        else
            cout << "No, it is not a leaf node.\n";
    }
    void isPrimeEvenodd()
    {
        // Prime Number Detection
        int count;
        for (int i = 1; i <= this->object; i++)
        {
            if (this->object % i == 0)
            {
                ++count;
            }
        }
        if (count == 2)
            cout << this->object << " is Prime.\n";
        else
            cout << this->object << " is not Prime.\n";

        // Even Or Odd Detection
        if (this->object % 2 == 0)
            cout << object << " is EVEN.\n";
        else
            cout << object << " is ODD.\n";
    }
    void insert(int newObject)
    {
        if (a == 0)
        {
            this->object = newObject;
            a++;
            return;
        }
        TreeNode *newNode = new TreeNode;
        newNode->object = newObject;
        TreeNode *p, *q;
        p = q = this;
        while (newObject != p->object && q != NULL)
        {
            p = q;

            if (newObject < p->object)
                q = p->getLeft();
            else
                q = p->getRight();
        }
        if (newObject == p->object)
        {
            cout << "Attempt to insert duplicate: " << newObject << endl;
            delete newNode;
        }
        else if (newObject < p->object)
            p->setLeft(newNode);
        else
            p->setRight(newNode);
    };
    void getLeftchild()
    {
        if (this->getLeft() != NULL)
            cout << this->getLeft()->object << " is left child of " << this->object << ".\n";
        else
            cout << "No left child.\n";
    }
    void getRightchild()
    {
        if (this->getRight() != NULL)
            cout << this->getRight()->object << " is right child of " << this->object << ".\n";
        else
            cout << "No right child.\n";
    }

    TreeNode *search(int inputObj)
    {
        TreeNode *temp = this;
        while (temp != NULL)
            if (inputObj < temp->object)
                temp = temp->getLeft();
            else if (inputObj > temp->object)
                temp = temp->getRight();
            else
                return temp;
        return NULL;
    }

    void findParent(const int inputObj)
    {
        TreeNode *temp = this;
        while (temp != NULL)
        {
            if (temp->getLeft() != NULL && temp->getLeft()->object == inputObj)
            {
                cout << temp->object << " is the parent of " << inputObj << endl;
                return;
            }
            if (temp->getRight() != NULL && temp->getRight()->object == inputObj)
            {
                cout << temp->object << " is the parent of " << inputObj << endl;
                return;
            }

            if (inputObj < temp->object)
            {
                temp = temp->getLeft();
            }
            else if (inputObj > temp->object)
            {
                temp = temp->getRight();
            }
            else
            {
                cout << "Parent Node Not Found\n";
                return;
            }
        }
    }

    void find_sibling(const int inputObj)
    {
        TreeNode *temp = this;
        while (temp != NULL)
        {
            if (temp->getLeft() != NULL)
            {
                if (temp->getLeft()->object == inputObj && temp->getRight() != NULL)
                {
                    cout << "The sibling of " << inputObj << " is " << temp->getRight()->object << endl;
                    return;
                }
            }
            else if (temp->getRight() != NULL)
            {
                if (temp->getRight()->object == inputObj && temp->getLeft() != NULL)
                {
                    cout << "The sibling of " << inputObj << " is " << temp->getLeft()->object << endl;
                    return;
                }
            }

            if (inputObj < temp->object)
            {
                temp = temp->getLeft();
            }
            else if (inputObj > temp->object)
            {
                temp = temp->getRight();
            }
            else
            {
                cout << "Sibling Not Found" << endl;
                return;
            }
        }
    }		
};

int main()
{
    int a[] = {10, 8, 12, 4, 11, 15, 6, 17, 7, 9, 16, -1};

    cout << "Data\n-------------\nMarks: ";
    for (int i = 0; a[i] != -1; i++)
    {
        cout << a[i];
        if (a[i + 1] != -1)
            cout << ", ";
    }
    cout << "\n\n";

    TreeNode root, *temp = NULL, *list[20], *t;
    for (int g = 0; g < 20; g++)
        list[g] = NULL;
    int input = -1, i = 0, current = 0, innerNode, externalNode, externalLinks;
    while (input != 0)
    {
        cout << "Enter your choice\nEnter 1 to create BST\nEnter 2 to search the node\nEnter 3 to find the no. of internal nodes\nEnter 4 to find the no. of external nodes\nEnter 5 to find the no. of internal links\nEnter 6 to find the no. of external links\nEnter 0 to terminate the program\n";
        cin >> input;
        switch (input)
        {
        case 0:
            return 0;
            break;
        case 1:
            cout << "\nBST is being created...." << endl;
            for (int i = 0; a[i] != -1; i++)
                root.insert(a[i]);
            cout << "Done\n\n";
            break;
        case 2:
            cout << "Enter the number you want to search in binary search tree" << endl;
            cin >> input;
            temp = root.search(input);
            if (temp == NULL)
            {
                cout << "No, " << input << " is not found.\n";
                break;
            }
            else
                cout << "Yes, " << input << " is found.\n";
            temp->isLeaf();
            root.find_sibling(input);
            root.findParent(input);
            temp->getLeftchild();
            temp->getRightchild();
            temp->isPrimeEvenodd();
            break;
        case 3:
            innerNode = 1;
            t = &root;
            i = 0, current = 0;
            while (t != NULL)
            {
                if (t->getLeft() != NULL)
                    list[i++] = t->getLeft();
                if (t->getRight() != NULL)
                    list[i++] = t->getRight();
                t = list[current++];
            }
            current = 0;
            while (list[current] != NULL)
                if (list[current++] != NULL)
                    ++innerNode;
            cout << "Total internal Nodes = " << innerNode << "\n\n";
            break;
        case 4:
            externalNode = 0;
            t = &root;
            i = 0, current = 0;
            while (t != NULL)
            {
                if (t->getLeft() != NULL)
                    list[i++] = t->getLeft();
                if (t->getRight() != NULL)
                    list[i++] = t->getRight();
                t = list[current++];
            }
            current = 0;
            while (list[current] != NULL)
            {
                if (list[current]->getLeft() == NULL)
                    ++externalNode;
                if (list[current++]->getRight() == NULL)
                    ++externalNode;
            }
            cout << "Total internal Nodes = " << externalNode << "\n\n";
            break;
        case 5:
            t = &root;
            i = 0, current = 0;
            while (t != NULL)
            {
                if (t->getLeft() != NULL)
                    list[i++] = t->getLeft();
                if (t->getRight() != NULL)
                    list[i++] = t->getRight();
                t = list[current++];
            }
            cout << "Total internal links = " << i << "\n\n";
            break;
        case 6:
            externalLinks = 0;
            t = &root;
            i = 0, current = 0;
            while (t != NULL)
            {
                if (t->getLeft() != NULL)
                    list[i++] = t->getLeft();
                if (t->getRight() != NULL)
                    list[i++] = t->getRight();
                t = list[current++];
            }
            current = 0;
            while (list[current] != NULL)
            {
                if (list[current]->getLeft() == NULL)
                    ++externalLinks;
                if (list[current++]->getRight() == NULL)
                    ++externalLinks;
            }
            cout << "Total external Links = " << externalLinks << "\n\n";
            break;
        default:
            cout << "Invalid Input!\n";
            break;
        }
    }
    return 0;
}

// For Payed Assignment Contact: +92 319 7247800
// Please Like comment & subscribe.